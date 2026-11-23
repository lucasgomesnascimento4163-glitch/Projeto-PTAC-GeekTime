import { conectar } from "../data/db.js";

const SEM_ID_DO_MONGO = { projection: { _id: 0 } };

async function colecao() {
  const db = await conectar();
  return db.collection('obras');
}

export async function findAll() {
  const obras = await colecao();
  return obras.find({}, SEM_ID_DO_MONGO).toArray();
}

export async function findById(id) {
  const obras = await colecao();
  return obras.findOne({ id }, SEM_ID_DO_MONGO);
}

export async function create(payload) {
  const obras = await colecao();
  const [ultima] = await obras.find({}, { projection: { _id: 0, id: 1 } }).sort({ id: -1 }).limit(1).toArray();
  const obra = { id: ultima ? ultima.id + 1 : 1, ...payload };

  await obras.insertOne({ ...obra });
  return obra;
}

export async function update(id, payload) {
  const obras = await colecao();
  return obras.findOneAndUpdate(
    { id },
    { $set: payload },
    { returnDocument: 'after', ...SEM_ID_DO_MONGO }
  );
}

export async function saveAll(lista) {
  const obras = await colecao();
  await obras.bulkWrite([
    ...lista.map(obra => ({ replaceOne: { filter: { id: obra.id }, replacement: obra, upsert: true } })),
    { deleteMany: { filter: { id: { $nin: lista.map(obra => obra.id) } } } }
  ]);
};