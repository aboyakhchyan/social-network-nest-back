import { User } from 'src/users/user.entity';
import AppDataSource from '../data-source';
import * as bcrypt from 'bcrypt';

const usersData = [
  {
    username: 'Narek',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    username: 'Anush',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    username: 'John',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    username: 'Meri',
    password: bcrypt.hashSync('123456', 10),
  },
];

async function usersSeed() {
  try {
    await AppDataSource.initialize();
    const userRepo = AppDataSource.getRepository(User);

    await Promise.all(
      usersData.map((user) => {
        const newUser = userRepo.create({
          username: user.username,
          password: user.password,
        });
        return userRepo.save(newUser);
      }),
    );

    console.log('Users created successfully');
  } catch (err) {
    console.log('Users creation failed:', err.message);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
  }
}

usersSeed();
