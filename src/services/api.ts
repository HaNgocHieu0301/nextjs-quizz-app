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
    updated?: string;
    expand: { 'cards(collection)': Card[] };
}

export type CardInput = Omit<Card, 'id'> & { id?: string };

export type CreateSetPayload = Omit<Collection, 'id' | 'created' | 'expand'> & { cards: CardInput[] };

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
    return apiClient.get<CollectionsResponse>('/collections/collections/records?expand=cards(collection)');
};

export const getCollectionById = (id: string) => {
    return apiClient.get<Collection>(`/collections/collections/records/${id}?expand=cards(collection)`);
};

export const updateCollection = async (collectionId: string, data: CreateSetPayload) => {
    try {
        // 1. Get old collection data and its cards for comparison
        const oldCollectionData = await getCollectionById(collectionId);
        const oldCards = oldCollectionData.data.expand?.['cards(collection)'] || [];
        const oldCardIds = new Set(oldCards.map(c => c.id));

        // 2. Update collection title and description (run in parallel)
        const collectionUpdatePromise = apiClient.patch(`/collections/collections/records/${collectionId}`, {
            title: data.title,
            description: data.description
        });

        const newCards = data.cards;
        // Get card's ids from form data
        const newCardIds = new Set(newCards.filter(c => c.id).map(c => c.id as string));

        const promises = [];

        // 3. Determine which cards to delete: a card exists in the DB (oldCards) but not in the form (newCards).
        for (const oldCard of oldCards) {
            if (!newCardIds.has(oldCard.id)) {
                promises.push(deleteCard(oldCard.id));
            }
        }

        // 4. Determine which cards to update or create:
        // 4.1 If a card has an ID and that ID exists in the DB -> UPDATE
        // 4.2 If a card has no ID (or its ID doesn't exist in the DB) -> CREATE
        for (const cardData of newCards) {
            if (cardData.id && oldCardIds.has(cardData.id)) {
                promises.push(updateCard(cardData.id, { term: cardData.term, definition: cardData.definition }));
            } else {
                promises.push(createCard({
                    term: cardData.term,
                    definition: cardData.definition,
                    collection: collectionId
                }));
            }
        }

        // 5. Run all requests in parallel for better performance
        await Promise.all([collectionUpdatePromise, ...promises]);

    } catch (error) {
        console.error("Failed to update collection:", error);
        throw error;
    }
};

export const createCard = (data: CreateCardPayload) => {
    return apiClient.post<Card>('/collections/cards/records', data);
};

export const updateCard = (id: string, data: { term: string; definition: string }) => {
    return apiClient.patch(`/collections/cards/records/${id}`, data);
};

export const deleteCard = (id: string) => {
    return apiClient.delete(`/collections/cards/records/${id}`);
};
