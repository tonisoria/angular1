import { ICategoria } from './icategoria';

export interface IProducte {
    id: number;
    nom: string;
    sobrenom: string;
    equip: string;
    _posicio: ICategoria;
    imatge: any;
}
