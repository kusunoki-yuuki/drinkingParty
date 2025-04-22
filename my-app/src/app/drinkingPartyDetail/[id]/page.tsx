'use client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DrinkingParty } from '../../../types/drinkingPartyTypes';

interface DrinkingPartyDetailProps {
    name: string;
    date: string;
    location: string;
    description: string;
}

const Page = () => {
    const { id } = useParams<{ id: string }>();
    const [partyDetail, setPartyDetail] = useState<DrinkingParty | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPartyDetail = async () => {
            try {
                const response = await axios.get<DrinkingParty>(
                    `/api/drinking-parties/${id}`
                );
                setPartyDetail(response.data);
            } catch (err) {
                setError('飲み会の詳細を取得できませんでした。');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPartyDetail();
        }
    }, [id]);

    if (loading) {
        return <div>読み込み中...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!partyDetail) {
        return <div>該当する飲み会が見つかりません。</div>;
    }

    return (
        <DrinkingPartyDetail
            name={partyDetail.drinking_party_name}
            date={partyDetail.date}
            location={partyDetail.location}
            description={partyDetail.remarks}
        />
    );
};
export default Page;

const DrinkingPartyDetail: React.FC<DrinkingPartyDetailProps> = ({
    name,
    date,
    location,
    description,
}) => {
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">飲み会詳細</h1>
            <div className="card shadow">
                <div className="card-body">
                    <h2 className="card-title text-primary">{name}</h2>
                    <p className="card-text">
                        <strong>日付:</strong> {date}
                    </p>
                    <p className="card-text">
                        <strong>場所:</strong> {location}
                    </p>
                    <p className="card-text">
                        <strong>詳細:</strong> {description}
                    </p>
                </div>
            </div>
        </div>
    );
};


