import Database from '../database/index.js';
import Category from '../app/models/category.js';

// Garante que a conexão seja inicializada
// Aguarda um curto período para inicialização assíncrona
await new Promise((r) => setTimeout(r, 500));

const categories = await Category.findAll();
console.log(categories.map((c) => c.toJSON()));

process.exit(0);
