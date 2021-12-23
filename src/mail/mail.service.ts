import { getVerifyEmailTemplate } from './raw-templates/verify-email.template';
import { Inject, Injectable } from '@nestjs/common';
import { MAIL_CONFIG_OPTIONS } from './constants';
import { MailModuleOptions } from './interfaces';

import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
	constructor(@Inject(MAIL_CONFIG_OPTIONS) private readonly options: MailModuleOptions) {}

	private async sendEmail(subject: string, text: string, toEmail: string, html: string) {
		sgMail.setApiKey(this.options.apiKey);

		const msg = {
			to: toEmail,
			from: this.options.fromEmail,
			subject,
			text,
			html
		};

		try {
			await sgMail.send(msg);
		} catch (e) {
			console.log(e);
		}
	}

	async sendVerificationEmail(email: string, code: string) {
		const template = getVerifyEmailTemplate(code);
		await this.sendEmail(
			'Verify Your Account',
			'Please verify your Email to managing ypur account smoothly !!',
			email,
			template
		);
	}
}
