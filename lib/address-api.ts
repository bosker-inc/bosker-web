import { request } from '@/lib/api';
import { BffAddress, BffAddressType } from '@/lib/types';

// GraphQL operations for the customer address book, against the BFF.

const ADDRESS_FIELDS = `
  id userId alias fullAddress lat long type isDefault
`;

export async function getCustomerAddressBook(): Promise<BffAddress[]> {
  const data = await request<{ getCustomerAddressBook: BffAddress[] }>(
    `query { getCustomerAddressBook { ${ADDRESS_FIELDS} } }`
  );
  return data.getCustomerAddressBook ?? [];
}

export interface CreateAddressInput {
  alias: string;
  fullAddress: string;
  lat: number;
  long: number;
  type: BffAddressType;
  isDefault?: boolean;
}

export async function createAddress(input: CreateAddressInput): Promise<BffAddress> {
  const data = await request<{ createAddress: BffAddress }>(
    `mutation ($input: CreateAddressInput!) { createAddress(input: $input) { ${ADDRESS_FIELDS} } }`,
    { input: { isDefault: false, ...input } }
  );
  return data.createAddress;
}

export async function deleteAddress(id: string): Promise<{ id: string; deleted: boolean }> {
  const data = await request<{ deleteAddress: { id: string; deleted: boolean } }>(
    `mutation ($id: String!) { deleteAddress(id: $id) { id deleted } }`,
    { id }
  );
  return data.deleteAddress;
}
