import { CreateCheckoutSessionOuput, CreateCheckoutSessionInput } from './dtos/create-checkout-session.dto';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreatePaymentInput, CreatePaymentOuput } from './dtos/create-payment.dto';
import { GetPaymentsOutput } from './dtos/get-payments.dto';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payments.service';

@Resolver((of) => Payment)
export class PaymentResolver {
	constructor(private readonly paymentService: PaymentService) {}

	@Mutation((returns) => CreatePaymentOuput)
	@Role([
		'Owner'
	])
	createPayment(
		@AuthUser() owner: User,
		@Args('input') createPaymentInput: CreatePaymentInput
	): Promise<CreatePaymentOuput> {
		return this.paymentService.createPayment(owner, createPaymentInput);
	}

	@Query((returns) => GetPaymentsOutput)
	@Role([
		'Owner'
	])
	getPayments(@AuthUser() user: User): Promise<GetPaymentsOutput> {
		return this.paymentService.getPayments(user);
	}

	@Mutation((returns) => CreateCheckoutSessionOuput)
	@Role([
		'Owner'
	])
	createCheckoutSessionForRestaurantPromotion(
		@Args('input') createCheckoutSessionInput: CreateCheckoutSessionInput
	): Promise<CreatePaymentOuput> {
		return this.paymentService.createCheckoutSessionForRestaurantPromotion(createCheckoutSessionInput);
	}
}
