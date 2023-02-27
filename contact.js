const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./dp/contact.json");
// console.log(contactsPath);
const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  //   console.log(contacts);
  return JSON.parse(contacts);
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === id);
  return contact || null;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  updateContacts(contacts);
  return newContact;
};

const updateContact = async ({ id, name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) return null;

  contacts[index] = { id, name, email, phone };
  await updateContacts(contacts);
  return contacts[index];
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) return null;

  const [deletedContact] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return deletedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
