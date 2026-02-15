import dotenv from 'dotenv';
import path from 'path';

// This ensures the .env is found from the root before anything else runs
dotenv.config({ path: path.resolve(process.cwd(), '.env') });