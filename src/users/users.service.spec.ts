import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { UsersService } from './users.service';

const mockRepository = () => ({
	findOne: jest.fn(),
	save: jest.fn(),
	create: jest.fn(),
	findOneOrFail: jest.fn(),
	delete: jest.fn()
});

const mockJwtService = () => ({
	sign: jest.fn(() => ''),
	verify: jest.fn()
});

const mockMailService = () => ({
	sendVerificationEmail: jest.fn()
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
	let service: UsersService;
	let usersRepository: MockRepository<User>;
	let verificationsRepository: MockRepository<Verification>;
	let mailService: MailService;
	let jwtService: JwtService;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers:
				[
					UsersService,
					{
						provide: getRepositoryToken(User),
						useValue: mockRepository()
					},
					{
						provide: getRepositoryToken(Verification),
						useValue: mockRepository()
					},
					{
						provide: JwtService,
						useValue: mockJwtService()
					},
					{
						provide: MailService,
						useValue: mockMailService()
					}
				]
		}).compile();

		service = module.get<UsersService>(UsersService);
		mailService = module.get<MailService>(MailService);
		jwtService = module.get<JwtService>(JwtService);
		usersRepository = module.get(getRepositoryToken(User));
		verificationsRepository = module.get(getRepositoryToken(Verification));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('createAccount', () => {
		const createAccountArgs = {
			email: 'bs@email.com',
			password: 'bs.password',
			role: 0
		};

		it('should fail if user exists', async () => {
			usersRepository.findOne.mockResolvedValue({
				id: 1,
				email: ''
			});
			const result = await service.createAccount(createAccountArgs);
			expect(result).toMatchObject({
				ok: false,
				error: 'User with this email already exists !'
			});
		});

		it('should create a new user', async () => {
			usersRepository.findOne.mockResolvedValue(undefined);
			usersRepository.create.mockReturnValue(createAccountArgs);
			usersRepository.save.mockResolvedValue(createAccountArgs);
			verificationsRepository.create.mockReturnValue({
				user: createAccountArgs
			});
			verificationsRepository.save.mockResolvedValue({
				code: 'code'
			});

			const result = await service.createAccount(createAccountArgs);

			expect(usersRepository.create).toHaveBeenCalledTimes(1);
			expect(usersRepository.create).toHaveBeenCalledWith(createAccountArgs);

			expect(usersRepository.save).toHaveBeenCalledTimes(1);
			expect(usersRepository.save).toHaveBeenCalledWith(createAccountArgs);

			expect(verificationsRepository.create).toHaveBeenCalledTimes(1);
			expect(verificationsRepository.create).toHaveBeenCalledWith({
				user: createAccountArgs
			});

			expect(verificationsRepository.save).toHaveBeenCalledTimes(1);
			expect(verificationsRepository.save).toHaveBeenCalledWith({
				user: createAccountArgs
			});

			expect(mailService.sendVerificationEmail).toHaveBeenCalledTimes(1);
			expect(mailService.sendVerificationEmail).toHaveBeenCalledWith(expect.any(String), expect.any(String));
			expect(result).toEqual({ ok: true });
		});

		it('should fail on exception', async () => {
			usersRepository.findOne.mockRejectedValue(new Error());
			const result = await service.createAccount(createAccountArgs);
			expect(result).toEqual({ ok: false, error: 'Failed to create account , try again later !' });
		});
	});

	it.todo('login');
	it.todo('findById');
	it.todo('getUserProfile');
	it.todo('editProfile');
	it.todo('verifyEmail');
});
