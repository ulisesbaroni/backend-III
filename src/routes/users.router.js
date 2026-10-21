import { Router } from 'express';
import { userRepository } from '../repositories/user.repository.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await userRepository.getUsers();
    res.json({ status: 'success', payload: users });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

export default router;
