"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';

type DrinkingParty = {
  drinking_party_id: number;
  drinking_party_name: string;
  date: string;
  location: string;
  participants: number;
};

export default function Home() {
  const [mockParties, setMockParties] = useState<DrinkingParty[]>([]);

  useEffect(() => {
    const fetchDrinkingParties = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/drinkPartyList');
        console.log('取得した飲み会リスト:', response);
        setMockParties(response.data);
      } catch (error) {
        console.error('飲み会リストの取得中にエラーが発生しました:', error);
      }
    };
    fetchDrinkingParties();
  }, []);
  
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">🍻 飲み会一覧</h2>
      <div className="row g-4">
      {mockParties.map((party) => (
        <div className="col-md-4" key={party.drinking_party_id}>
        <div className="card shadow-sm h-100">
          <div className="card-body d-flex flex-column">
          <h5 className="card-title">{party.drinking_party_name}</h5>
          <p className="card-text flex-grow-1">
            <strong>日付:</strong> {party.date}<br />
            <strong>場所:</strong> {party.location}<br />
            <strong>参加者:</strong> {party.participants}人
          </p>
          <a href={`drinkingPartyDetail/${party.drinking_party_id}`} className="btn btn-primary mt-auto">詳細を見る</a>
          </div>
        </div>
        </div>
      ))}
      </div>
      <h3 className="text-center">📅 カレンダー表示</h3>
      <div className="calendar">
        {mockParties.map((party) => (
        <div key={party.drinking_party_id} className="calendar-event">
      </div>
      ))}
      </div>
    </div>
  );
}
