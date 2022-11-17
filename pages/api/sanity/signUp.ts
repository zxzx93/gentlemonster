import { signUpHandler } from 'next-auth-sanity';
import { sanityClient } from '../../../sanity';

export default signUpHandler(sanityClient);
