import { Router } from 'express';
import { petRepository } from '../repositories/pet.repository.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const pets = await petRepository.getPets();
    res.json({ status: 'success', payload: pets });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

export default router;
