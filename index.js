const { program } = require("commander");
const contactsApi = require("./contacts");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contactsApi.listContacts();
      console.table(contactsList);
      break;

    case "get":
      const oneContact = await contactsApi.getContactById(id);
      console.log(oneContact);
      break;

    case "add":
      const newContact = await contactsApi.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const deletedContact = await contactsApi.removeContact(id);
      console.log(deletedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
