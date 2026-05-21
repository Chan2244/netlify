// hooks/useIdeas.ts
import { useState, useEffect } from 'react';

// Define the Idea shape based on MongoDB's typical structure
interface Idea {
    _id: string; // MongoDB uses _id instead of $id
    title: string;
    description: string;
    userId: string;
    createdAt: string;
}

export function useIdeas() {
    const [current, setCurrent] = useState<Idea[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchIdeas = async (): Promise<void> => {
        try {
            const response = await fetch('/api/ideas');
            const data = await response.json();
            setCurrent(data);
        } catch (error) {
            console.error('Error fetching ideas:', error);
        } finally {
            setLoading(false);
        }
    };

    const add = async (idea: Omit<Idea, '_id' | 'createdAt'>): Promise<void> => {
        try {
            const response = await fetch('/api/ideas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(idea),
            });
            const newIdea = await response.json();
            
            setCurrent(prev => [newIdea, ...prev].slice(0, 10));
        } catch (error) {
            console.error('Error adding idea:', error);
        }
    };

    const remove = async (id: string): Promise<void> => {
        try {
            await fetch(`/api/ideas/${id}`, { method: 'DELETE' });
            setCurrent(prev => prev.filter(item => item._id !== id));
        } catch (error) {
            console.error('Error removing idea:', error);
        }
    };

    useEffect(() => {
        fetchIdeas();
    }, []);

    return { current, loading, add, remove };
}