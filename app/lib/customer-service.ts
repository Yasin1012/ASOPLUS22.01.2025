import { databases, DATABASE_ID, CUSTOMERS_COLLECTION_ID } from './appwrite-config';
import { ID } from 'appwrite';

export interface CustomerContact {
  name: string;
  email?: string;
  phone?: string;
  location?: string;
}

export interface Customer {
  $id?: string;
  logo?: string;
  customerName: string;
  customerNumber: number;
  management: CustomerContact[];
  primaryContact: CustomerContact[];
  safetySpecialist?: CustomerContact[];
  firstAider?: CustomerContact[];
  safetyOfficer?: CustomerContact[];
  fireProtectionAssistant?: CustomerContact[];
  companyDoctor?: CustomerContact[];
  customerResponsible?: CustomerContact[];
  address: {
    street: string;
    postalCode: string;
    city: string;
    country?: string;
  }[];
  contactInformation?: {
    email?: string;
    phone?: string;
  };
}

export const customerService = {
  async listCustomers() {
    const response = await databases.listDocuments(
      DATABASE_ID!,
      CUSTOMERS_COLLECTION_ID!
    );
    return response.documents as unknown as Customer[];
  },

  async createCustomer(customer: Omit<Customer, '$id'>) {
    return await databases.createDocument(
      DATABASE_ID!,
      CUSTOMERS_COLLECTION_ID!,
      ID.unique(),
      customer
    );
  },

  async updateCustomer(id: string, customer: Partial<Customer>) {
    return await databases.updateDocument(
      DATABASE_ID!,
      CUSTOMERS_COLLECTION_ID!,
      id,
      customer
    );
  },

  async deleteCustomer(id: string) {
    return await databases.deleteDocument(
      DATABASE_ID!,
      CUSTOMERS_COLLECTION_ID!,
      id
    );
  }
};