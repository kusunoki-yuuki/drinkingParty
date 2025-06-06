'use client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DrinkingParty } from '../../../types/drinkingPartyTypes';

const Page = () => {
    const { id } = useParams<{ id: string }>();
    const [partyDetail, setPartyDetail] = useState<DrinkingParty>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPartyDetail = async () => {
            try {
                const response = await axios.get<DrinkingParty>(
                    `http://localhost:8000/api/drinkPartyDetail/${id}`
                );
                setPartyDetail(response.data);
                console.log(response.data);
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
        // ここでpartyDetailがundefinedの場合の処理を行う
        return <div>該当する飲み会が見つかりません。</div>;
    }else {
        // partyDetailが正しく取得できた場合の処理を行う
        const totalFee = partyDetail.participants.reduce((sum, participant) => sum + participant.fee, 0);
        return (
            <DrinkingPartyDetail
            drinking_party_id={partyDetail.drinking_party_id}
            drinking_party_name={partyDetail.drinking_party_name}
            date={partyDetail.date}
            location={partyDetail.location}
            remarks={partyDetail.remarks}
            participants={partyDetail.participants}
            />
        );
    }
};
export default Page;

const DrinkingPartyDetail: React.FC<DrinkingParty> = ({
    drinking_party_id,
    drinking_party_name,
    date,
    location,
    remarks,
    participants,
}) => {
    const totalFee = participants.reduce((sum, participant) => sum + participant.fee, 0);
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">飲み会詳細</h1>
            <div className="card shadow">
                <div className="card-body">
                    <h2 className="card-title text-primary">{drinking_party_name}</h2>
                    <p className="card-text">
                        <strong>日付:</strong> {date}
                    </p>
                    <p className="card-text">
                        <strong>場所:</strong> {location}
                    </p>
                    <p className="card-text">
                        <strong>詳細:</strong> {remarks}
                    </p>
                    <p className="card-text">
                        <strong>合計金額:</strong> {totalFee}円
                    </p>
                    <div>
                        <strong>参加者:</strong>
                        <ul>
                            {participants.map((participant, index) => (
                                <li key={index}>
                                    ユーザー名: {participant.user_name}, 会費: {participant.fee}円
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};


