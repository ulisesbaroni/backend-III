import { Router } from 'express';
import { generatePets, generateUsers } from '../mocks/mocking.js';
import { userRepository } from '../repositories/user.repository.js';
import { petRepository } from '../repositories/pet.repository.js';

const router = Router();

const MAX_QTY = 1000;

const parseQty = (value, defaultQty, min = 1) => {
  if (value === undefined) return defaultQty;
  const qty = Number(value);
  return Number.isInteger(qty) && qty >= min && qty <= MAX_QTY ? qty : null;
};

router.get('/mockingpets', (req, res) => {
  const qty = parseQty(req.query.qty, 100);
  if (qty === null) {
    return res.status(400).json({ status: 'error', error: `qty debe ser un entero entre 1 y ${MAX_QTY}` });
  }
  res.json({ status: 'success', payload: generatePets(qty) });
});

router.get('/mockingusers', async (req, res) => {
  const qty = parseQty(req.query.qty, 50);
  if (qty === null) {
    return res.status(400).json({ status: 'error', error: `qty debe ser un entero entre 1 y ${MAX_QTY}` });
  }
  try {
    const users = await generateUsers(qty);
    res.json({ status: 'success', payload: users });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

router.post('/generateData', async (req, res) => {
  const { users, pets } = req.body ?? {};
  const usersQty = parseQty(users, 0, 0);
  const petsQty = parseQty(pets, 0, 0);

  if (usersQty === null || petsQty === null) {
    return res.status(400).json({ status: 'error', error: `users y pets deben ser enteros entre 0 y ${MAX_QTY}` });
  }
  if (usersQty === 0 && petsQty === 0) {
    return res.status(400).json({ status: 'error', error: 'Indicá al menos una cantidad de users o pets' });
  }

  try {
    const insertedUsers = usersQty > 0 ? await userRepository.createUsers(await generateUsers(usersQty)) : [];
    const insertedPets = petsQty > 0 ? await petRepository.createPets(generatePets(petsQty)) : [];
    res.status(201).json({
      status: 'success',
      payload: { users: insertedUsers.length, pets: insertedPets.length }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

export default router;
