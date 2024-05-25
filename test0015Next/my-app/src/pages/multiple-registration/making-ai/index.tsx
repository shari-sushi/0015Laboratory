import React, { useState } from 'react';

type CreateKaraokeData = {
    MovieUrl: string;
    SongName: string;
    SingStart: string;
};

const KaraokeForm: React.FC = () => {
    const [formData, setFormData] = useState<CreateKaraokeData[]>([
        { MovieUrl: '', SongName: '', SingStart: '' },
    ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        const updatedFormData = [...formData];
        updatedFormData[index] = {
            ...updatedFormData[index],
            [name]: value,
        };
        setFormData(updatedFormData);
    };

    const handleAddRow = () => {
        setFormData([...formData, { MovieUrl: '', SongName: '', SingStart: '' }]);
    };

    const handleRemoveRow = (index: number) => {
        const updatedFormData = [...formData];
        updatedFormData.splice(index, 1);
        setFormData(updatedFormData);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // ここでバックエンドにデータを送信する処理を記述する
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {formData.map((row, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="MovieUrl"
                        placeholder="MovieUrl"
                        value={row.MovieUrl}
                        onChange={(e) => handleChange(e, index)}
                    />
                    <input
                        type="text"
                        name="SongName"
                        placeholder="SongName"
                        value={row.SongName}
                        onChange={(e) => handleChange(e, index)}
                    />
                    <input
                        type="text"
                        name="SingStart"
                        placeholder="SingStart"
                        value={row.SingStart}
                        onChange={(e) => handleChange(e, index)}
                    />
                    <button type="button" onClick={() => handleRemoveRow(index)}>
                        Remove
                    </button>
                </div>
            ))}
            <button type="button" onClick={handleAddRow}>
                Add Row
            </button>
            <button type="submit">Submit</button>
        </form>
    );
};

export default KaraokeForm;