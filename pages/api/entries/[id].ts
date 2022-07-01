import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = 
     | {message: string}
     | IEntry
     | null

export default function handler( req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query;

    if ( !mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'El id no es valido ' + id })
    }
    
    switch ( req.method ) {
        case 'GET':
            return getEntry( req, res);

        case 'PUT':
            return updateEntry( req, res);
        
        case 'DELETE':
            return deleteEntry( req, res);
            
        default:
            return res.status(400).json({ message: 'El metodo no existe'})
            
        }
        
    }
    
    const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
        const { id } = req.query;
        
        await db.connect();
        
        const entryToUpdate = await Entry.findById(id);

        if ( !entryToUpdate ) { 
            await db.disconnect();
            return res.status(400).json({ message: 'No hay entrada con ese ID: ' + id })
        }

        const {
            description = entryToUpdate.description,
            status = entryToUpdate.status,
        } = req.body

        try {
            const updateEntry = await Entry.findByIdAndUpdate( id, { description, status}, {runValidators: true, new: true})
            await db.disconnect();
            res.status(200).json( updateEntry );

        } catch (error) {
            await db.disconnect();
            res.status(400).json( {message: 'Bad request'} );
        }



}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {id} = req.query
    
    await db.connect()
    const entryResult = await Entry.findById(id)

    if ( !entryResult ) { 
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada con ese ID: ' + id })
    }

    await db.disconnect()


    res.status(200).json( entryResult);
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {id} = req.query
    
    await db.connect()
    const entryResult = await Entry.findById(id)

    if ( !entryResult ) { 
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada con ese ID: ' + id })
    }

    await db.disconnect()

    const deleted = await Entry.findByIdAndRemove(id)

    res.status(200).json( deleted);

}