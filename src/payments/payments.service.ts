
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
import { LessThan, Repository } from 'typeorm';
import { PAYMENT_CONFIG_OPTIONS } from './constants';
import { CreatePaymentInput, CreatePaymentOuput } from './dtos/create-payment.dto';
import { GetPaymentsOutput } from './dtos/get-payments.dto';
import { Payment } from './entities/payment.entity';
import { PaymentModuleOptions } from './interfaces';
import Stripe from 'stripe'
import { CreateCheckoutSessionInput, CreateCheckoutSessionOuput } from './dtos/create-checkout-session.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly payments: Repository<Payment>,
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    @Inject(PAYMENT_CONFIG_OPTIONS) private readonly options: PaymentModuleOptions
  ) { }

  private stripeApi = new Stripe(this.options.secretKey,{ apiVersion: '2020-08-27',});

  async createPayment(
    owner: User,
    { restaurantId }: CreatePaymentInput,
  ): Promise<CreatePaymentOuput> {
    try {
      const restaurant = await this.restaurants.findOne(restaurantId);
      if (!restaurant) {
        return {
          ok: false,
          error: 'Restaurant not found !!',
        };
      }
      if (restaurant.ownerId !== owner.id) {
        return {
          ok: false,
          error: 'You are not allowed to do this !!',
        };
      }
      await this.payments.save(
        this.payments.create({
          user: owner,
          restaurant,
        }),
      );
      restaurant.isPromoted = true;
      const date = new Date();
      date.setDate(date.getDate() + 7);
      restaurant.promotedUntil = date;
      this.restaurants.save(restaurant);
      return {
        ok: true,
      };
    } catch {
      return { ok: false, error: 'Failed to complete the payment !!' };
    }
  }

    async getPayments(user: User): Promise<GetPaymentsOutput> {
    try {
      const payments = await this.payments.find({ user: user });
      return {
        ok: true,
        payments,
      };
    } catch {
      return {
        ok: false,
        error: 'Failed to load payments !!',
      };
    }
  }

    async checkPromotedRestaurants() {
    const restaurants = await this.restaurants.find({
      isPromoted: true,
      promotedUntil: LessThan(new Date()),
    });
    console.log(restaurants);
    restaurants.forEach(async restaurant => {
      restaurant.isPromoted = false;
      restaurant.promotedUntil = null;
      await this.restaurants.save(restaurant);
    });
  }

  async createCheckoutSession(createCheckoutSessionInput:CreateCheckoutSessionInput):Promise<CreateCheckoutSessionOuput> {
    try {
      const { customer_email,line_items} = createCheckoutSessionInput;
      if (line_items.length === 0) {
        return {
          ok: false,
          error:'Please provide the line items for the payment session !!'
        }
      }

      const session = await this.stripeApi.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        customer_email,
        line_items,
        success_url: `${process.env.FRONTEND_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:`${process.env.FRONTEND_BASE_URL}/canceled`
      })
      return {
        ok: true,
        session_id:session.id
      }
    } catch (e) {
      console.log(e)
      return {
        ok: false,
        error:'Something went wrong , unable to create payment session !'
      }
    }
  }

}