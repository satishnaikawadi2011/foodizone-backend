import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { v2 as cloudinary } from 'cloudinary';
import { Express } from 'express';
import * as fs from 'fs';

@Controller('uploads')
export class UploadsController {
	constructor(private readonly configService: ConfigService) {}

	@Post('')
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(@UploadedFile() file: Express.Multer.File) {
		cloudinary.config({
			api_key: this.configService.get('CLOUDINARY_API_KEY'),
			api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
			cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME')
		});
		const fileStr = `data:image/png;base64,${file.buffer.toString('base64')}`;
		const uploadResponse = await cloudinary.uploader.upload(fileStr, {
			upload_preset: 'foodizone-project'
		});
		const url = await uploadResponse.url;
		return { url };
	}
}
