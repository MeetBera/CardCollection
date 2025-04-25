import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';

// Card type definition
interface CardStats {
  hitpoints: string;
  damage: string;
  damagePerSecond: string;
  range: string;
  deployTime: string;
  specialAbility: string;
}

interface Card {
  name: string;
  rarity: string;
  elixirCost: number;
  type: string;
  description: string;
  stats: CardStats;
  imageUrl: string;
}


// Props for AdminPage
interface AdminPageProps {
  addCard: (card: Card) => void;
}

const AdminPage: React.FC<AdminPageProps> = () => {
  const [formData, setFormData] = useState<Omit<Card, 'imageUrl'>>({
    name: '',
    rarity: 'Common',
    elixirCost: 1,
    type: 'Troop',
    description: '',
    stats: {
      hitpoints: '',
      damage: '',
      damagePerSecond: '',
      range: '',
      deployTime: '',
      specialAbility: '',
    },
  });
  

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
  
    if (['hitpoints', 'damage', 'damagePerSecond', 'range', 'deployTime', 'specialAbility'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'elixirCost' ? parseInt(value) : value,
      }));
    }
  };
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) {
      alert('Please select an image for the card');
      return;
    }

    const newCard: Card = {
      ...formData,
      imageUrl: selectedImage,
    };

    try {
      const response = await fetch('http://localhost:5000/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      });

      if (!response.ok) {
        throw new Error('Failed to create card');
      }

      alert('Card created successfully!');
      setFormData({
        name: '',
        rarity: 'Common',
        elixirCost: 1,
        type: 'Troop',
        description: '',
        stats: {
          hitpoints: '',
          damage: '',
          damagePerSecond: '',
          range: '',
          deployTime: '',
          specialAbility: '',
        },
      });
      
      setSelectedImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create card. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-6">
      <div className="flex items-center mb-6">
        <RouterLink to="/" className="text-blue-600 hover:text-blue-800 flex items-center">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Cards
        </RouterLink>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Card</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Name" name="name" value={formData.name} onChange={handleChange} />
          <ImageUpload
            fileInputRef={fileInputRef}
            selectedImage={selectedImage}
            handleImageChange={handleImageChange}
          />
          <SelectField label="Rarity" name="rarity" value={formData.rarity} onChange={handleChange} options={['Common', 'Rare', 'Epic', 'Legendary', 'Champion']} />
          <SelectField label="Type" name="type" value={formData.type} onChange={handleChange} options={['Troop', 'Spell', 'Building', 'Champion']} />
          <InputField label="Elixir Cost" name="elixirCost" value={formData.elixirCost} onChange={handleChange} type="number" min="1" max="10" />
        </div>

        <TextareaField label="Description" name="description" value={formData.description} onChange={handleChange} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <InputField
    label="Hitpoints"
    name="hitpoints"
    value={formData.stats.hitpoints}
    onChange={handleChange}
  />
  <InputField
    label="Damage"
    name="damage"
    value={formData.stats.damage}
    onChange={handleChange}
  />
  <InputField
    label="Damage Per Second"
    name="damagePerSecond"
    value={formData.stats.damagePerSecond}
    onChange={handleChange}
  />
  <InputField
    label="Range"
    name="range"
    value={formData.stats.range}
    onChange={handleChange}
  />
  <InputField
    label="Deploy Time"
    name="deployTime"
    value={formData.stats.deployTime}
    onChange={handleChange}
  />
  <InputField
    label="Special Ability"
    name="specialAbility"
    value={formData.stats.specialAbility}
    onChange={handleChange}
  />
</div>


        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
          >
            Create Card
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable Input Field Component
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  min,
  max,
}: {
  label: string;
  name: string;
  value: any;
  onChange: any;
  type?: string;
  min?: string;
  max?: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>
);

// Reusable Select Field Component
const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: any;
  options: string[];
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

// Reusable Textarea Field Component
const TextareaField = ({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: any;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>
);

// Image Upload Field
const ImageUpload = ({
  fileInputRef,
  selectedImage,
  handleImageChange,
}: {
  fileInputRef: React.RefObject<HTMLInputElement>;
  selectedImage: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Card Image</label>
    <div className="flex flex-col items-center w-full">
      <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageChange} className="hidden" required />
      <div
        onClick={() => fileInputRef.current?.click()}
        className={`w-full h-32 border-2 border-dashed rounded-lg cursor-pointer flex items-center justify-center transition-colors duration-200 ${
          selectedImage ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-500'
        }`}
      >
        {selectedImage ? (
          <img src={selectedImage} alt="Preview" className="w-full h-full object-contain rounded-lg" />
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="w-8 h-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">Click to upload image</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default AdminPage;