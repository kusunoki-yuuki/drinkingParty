import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// ユーザーリストコンポーネント
const UserList = () => {
    // ユーザー情報の配列
    const users = [
        { id: 1, name: '山田 太郎', role: 'ソフトウェアエンジニア', company: 'テックコープ' },
        { id: 2, name: '佐藤 花子', role: 'プロダクトマネージャー', company: 'イノベート株式会社' },
        { id: 3, name: '鈴木 次郎', role: 'UXデザイナー', company: 'クリエイティブスタジオ' },
        { id: 4, name: '田中 一郎', role: 'データサイエンティスト', company: 'データワークス' },
    ];

    return (
        <div className="container mt-5">
            {/* タイトル */}
            <h1 className="mb-4">ユーザーリスト</h1>
            {/* ユーザー情報のテーブル */}
            <table className="table table-striped table-bordered">
                <thead className="table-primary">
                    <tr>
                        <th>#</th>
                        <th>名前</th>
                        <th>役職</th>
                        <th>会社</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>{user.company}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;