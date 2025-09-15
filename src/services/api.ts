// src/services/api.ts
import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export interface Card {
    id: string;
    term: string;
    definition: string;
}

export interface Collection {
    id: string;
    title: string;
    description?: string;
    created: string;
    updated: string;
    expand: { 'cards(collection)': Card[] };
}

export type CreateSetPayload = Omit<Collection, 'id' | 'created' | 'expand'> & { cards: Omit<Card, 'id'>[] };

export type CreateCardPayload = Omit<Card, 'id'> & { collection: string };

export type CollectionsResponse = {
    items: Collection[];
    totalItems: number;
    page: number;
    totalPages: number;
};

export const createCollection = async (data: CreateSetPayload) => {
    const collectionData = { title: data.title, description: data.description || "" };
    const collection = await apiClient.post<Collection>('/collections/collections/records', collectionData).then(res => res.data);
    for(const card of data.cards) {
        await apiClient.post<Card>('/collections/cards/records', { ...card, collection: collection.id });
    }
    return collection;
};

export const getCollections = () => {
    return apiClient.get<CollectionsResponse>('/collections/collections/records');
};

export const getCollectionById = (id: string) => {
    return apiClient.get<Collection>(`/collections/collections/records/${id}`);
};

export const createCard = (data: CreateCardPayload) => {
    return apiClient.post<Card>('/collections/cards/records', data);
};