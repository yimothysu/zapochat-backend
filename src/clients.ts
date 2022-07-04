// id => name
export const clients = new Map<string, string>();

type NewClientAction = {
  id: string;
  name: string;
};

const makeClientAction = (
  clientId: string,
  clientName: string | undefined
) => ({
  id: clientId,
  name: clientName || "Anonymous",
});

export const getClients = () => {
  const clientsList: NewClientAction[] = [];
  for (let clientRecord of clients) {
    clientsList.push(getClient(clientRecord[0]));
  }
  return clientsList;
};

export const removeClient = (clientId: string) => {
  clients.delete(clientId);
};

export const getClient: (clientId: string) => NewClientAction = (
  clientId: string
) => makeClientAction(clientId, clients.get(clientId));
