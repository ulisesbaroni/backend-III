import { Router } from 'express';
import { generatePets } from '../mocks/mocking.js';

const router = Router();

const MAX_QTY = 1000;

const parseQty = (value, defaultQty) => {
  if (value === undefined) return defaultQty;
  const qty = Number(value);
  return Number.isInteger(qty) && qty > 0 && qty <= MAX_QTY ? qty : null;
};

router.get('/mockingpets', (req, res) => {
  const qty = parseQty(req.query.qty, 100);
  if (qty === null) {
    return res.status(400).json({ status: 'error', error: `qty debe ser un entero entre 1 y ${MAX_QTY}` });
  }
  res.json({ status: 'success', payload: generatePets(qty) });
});

export default router;
