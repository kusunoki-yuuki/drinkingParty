import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';

const mockParties = [
  {
    id: 1,
    title: '4月歓迎会 @居酒屋 花火',
    date: '2025-04-10',
    location: '渋谷駅 徒歩5分',
    participants: 12,
  },
  {
    id: 2,
    title: '金曜夜飲み @バル ナカメ',
    date: '2025-04-12',
    location: '中目黒駅前',
    participants: 8,
  },
  {
    id: 3,
    title: '部署親睦会 @焼肉 銀河',
    date: '2025-04-15',
    location: '池袋西口',
    participants: 20,
  },
];

export default function Home() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">🍻 飲み会一覧</h2>
      <div className="row g-4">
      {mockParties.map((party) => (
        <div className="col-md-4" key={party.id}>
        <div className="card shadow-sm h-100">
          <div className="card-body d-flex flex-column">
          <h5 className="card-title">{party.title}</h5>
          <p className="card-text flex-grow-1">
            <strong>日付:</strong> {party.date}<br />
            <strong>場所:</strong> {party.location}<br />
            <strong>参加者:</strong> {party.participants}人
          </p>
          <a href={`drinkingPartyDetail/${party.id}`} className="btn btn-primary mt-auto">詳細を見る</a>
          </div>
        </div>
        </div>
      ))}
      </div>
      <h3 className="text-center">📅 カレンダー表示</h3>
      <div className="calendar">
        {mockParties.map((party) => (
        <div key={party.id} className="calendar-event">
          <strong>{party.date}</strong>: {party.title}
        </div>
        ))}
      </div>
    </div>
  );
}
