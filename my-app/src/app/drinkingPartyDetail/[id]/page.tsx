'use client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'next/navigation';

interface DrinkingPartyDetailProps {
    name: string;
    date: string;
    location: string;
    description: string;
}

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

// サンプルデータ
const sampleData = [
    {
        id: 1,
        name: '新年会',
        date: '2023-12-31',
        location: '新宿居酒屋',
        description: '楽しい新年会をしましょう！',
    },
    {
        id: 2,
        name: '忘年会',
        date: '2023-12-15',
        location: '渋谷カフェ',
        description: '今年を締めくくる忘年会！',
    },
];

const Page = () => {
    const { id } = useParams<{ id: string }>(); // useParamsを使用してURLパラメータを取得

    // IDが取得できない場合の処理
    if (!id) {
        return <div>Loading...</div>;
    }

    // IDに基づいてデータを取得
    const partyDetail = sampleData.find((party) => party.id === Number(id));

    // 該当するデータがない場合の処理
    if (!partyDetail) {
        return <div>該当する飲み会が見つかりません。</div>;
    }

    return <DrinkingPartyDetail {...partyDetail} />;
};

export default Page;