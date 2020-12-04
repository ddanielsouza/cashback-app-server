import { container } from 'tsyringe';
import IAuthProvider from './authProvider/IAuthProvider';
import JsonWebTokenProvider from './authProvider/implementations/JsonWebTokenProvider';

container.registerSingleton<IAuthProvider>('AuthProvider', JsonWebTokenProvider);
