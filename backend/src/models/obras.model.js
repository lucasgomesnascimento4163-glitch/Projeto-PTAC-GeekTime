import { readObras, writeObras } from "../db.js";

export async function findAll() {
  return readObras();
}

export async function findById(id) {
  const obras = await readObras();
  return obras.find(obra => obra.id === id) ?? null;
}

export async function create(payload) {
  const obras = await readObras();
  const nextId = obras.length ? Math.max(...obras.map(obra => obra.id)) + 1 : 1;
  const obra = { id: nextId, ...payload };

  await writeObras([...obras, obra]);
  return obra;
}

export async function update(id, payload) {
  const obras = await readObras();
  const index = obras.findIndex(obra => obra.id === id);
  if (index === -1) return null;

  obras[index] = { ...obras[index], ...payload };
  await writeObras(obras);
  return obras[index];
}

export async function saveAll(obras) {
  await writeObras(obras);
}
