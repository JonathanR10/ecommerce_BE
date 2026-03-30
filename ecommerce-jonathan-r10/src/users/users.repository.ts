import { Injectable } from '@nestjs/common';

const users = [
  {
    id: '1',
    email: 'finn@oooland.com',
    name: 'Finn the Human',
    password: '123456',
    address: 'Tree Fort',
    phone: '555-0001',
    country: 'Land of Ooo',
    city: 'Grasslands',
  },
  {
    id: '2',
    email: 'jake@oooland.com',
    name: 'Jake the Dog',
    password: '123456',
    address: 'Tree Fort',
    phone: '555-0002',
    country: 'Land of Ooo',
    city: 'Grasslands',
  },
  {
    id: '3',
    email: 'pb@candykingdom.com',
    name: 'Princess Bubblegum',
    password: '123456',
    address: 'Candy Castle',
    phone: '555-0003',
    country: 'Candy Kingdom',
    city: 'Candy City',
  },
  {
    id: '4',
    email: 'marceline@nightosphere.com',
    name: 'Marceline',
    password: '123456',
    address: 'Abandoned House',
    phone: '555-0004',
    country: 'Ooo',
    city: 'Dark Forest',
  },
  {
    id: '5',
    email: 'iceking@icekingdom.com',
    name: 'Ice King',
    password: '123456',
    address: 'Ice Castle',
    phone: '555-0005',
    country: 'Ice Kingdom',
    city: 'Frozen Lands',
  },
  {
    id: '6',
    email: 'bmo@treefort.com',
    name: 'BMO',
    password: '123456',
    address: 'Tree Fort',
    phone: '555-0006',
    country: 'Land of Ooo',
    city: 'Grasslands',
  },
  {
    id: '7',
    email: 'flameprincess@firekingdom.com',
    name: 'Flame Princess',
    password: '123456',
    address: 'Fire Castle',
    phone: '555-0007',
    country: 'Fire Kingdom',
    city: 'Lava City',
  },
  {
    id: '8',
    email: 'lsp@lumpyspace.com',
    name: 'Lumpy Space Princess',
    password: '123456',
    address: 'Cloud Mansion',
    phone: '555-0008',
    country: 'Lumpy Space',
    city: 'Purple Hills',
  },
  {
    id: '9',
    email: 'lemongrab@candykingdom.com',
    name: 'Lemongrab',
    password: '123456',
    address: 'Lemon Castle',
    phone: '555-0009',
    country: 'Candy Kingdom',
    city: 'Lemon Lands',
  },
  {
    id: '10',
    email: 'gunter@icekingdom.com',
    name: 'Gunter',
    password: '123456',
    address: 'Ice Castle',
    phone: '555-0010',
    country: 'Ice Kingdom',
    city: 'Frozen Lands',
  },
  {
    id: '11',
    email: 'lady@rainicorn.com',
    name: 'Lady Rainicorn',
    password: '123456',
    address: 'Rainbow Fields',
    phone: '555-0011',
    country: 'Land of Ooo',
    city: 'Rainbow Valley',
  },
  {
    id: '12',
    email: 'neptr@treefort.com',
    name: 'NEPTR',
    password: '123456',
    address: 'Tree Fort',
    phone: '555-0012',
    country: 'Land of Ooo',
    city: 'Grasslands',
  },
  {
    id: '13',
    email: 'pepbut@candykingdom.com',
    name: 'Peppermint Butler',
    password: '123456',
    address: 'Candy Castle',
    phone: '555-0013',
    country: 'Candy Kingdom',
    city: 'Candy City',
  },
  {
    id: '14',
    email: 'tree@forest.com',
    name: 'Tree Trunks',
    password: '123456',
    address: 'Forest Cottage',
    phone: '555-0014',
    country: 'Land of Ooo',
    city: 'Forest',
  },
  {
    id: '15',
    email: 'magicman@mars.com',
    name: 'Magic Man',
    password: '123456',
    address: 'Mars Palace',
    phone: '555-0015',
    country: 'Mars',
    city: 'Martian City',
  },
];

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  country?: string | undefined;
  city?: string | undefined;
}

@Injectable()
export class UsersRepository {
  getAllUsers() {
    return users;
  }
}
