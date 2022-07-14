import { Request, Response } from 'express';
import {
    getAllLocations,
    getOneLocation,
    addLocation,
    updateLocation,
    deleteLocation
} from './locations.services';


export const handlerAllLocations = async (req: Request, res: Response) => {
    try {
        const locations = await getAllLocations();
        if(!locations) {
            return res.status(404).json({
                message: 'No locations found'
            });
        } else {
            return res.status(200).json(locations);
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Locations could not be retrieved'
        });
    }
}

export async function handlerOneLocation (req: Request, res: Response) {
    try{
        const location = await getOneLocation(req.params.id);
        if(!location) {
            return res.status(404).json({
                message: 'Location not found'
            });
        } else {
            return res.status(200).json(location);
        }
    } catch(err) {
        res.status(500).json({ message: 'Error in One Location' });
    }
}


export async function handlerAddLocation (req: Request, res: Response) {
    try{
        const payload = req.body;
        payload.lat = parseFloat(payload.lat);
        payload.lng = parseFloat(payload.lng);
        
        const location = await addLocation(payload);
        if(!location) {
            return res.status(404).json({
                message: 'Location not added'
            });
        } else {
            return res.status(200).json(location);
        }
    } catch(err) {
        res.status(500).json({ message: 'Error in Add Location' });
    }
}


export async function handlerUpdateLocation (req: Request, res: Response) {
    try{
        const payload = req.body;
        const idFromParams = req.params.id;
        const location = await updateLocation(idFromParams, payload);
        if(!location) {
            return res.status(404).json({
                message: 'Location not updated'
            });
        } else {
            return res.status(200).json(location);
        }
    } catch(err) {
        res.status(500).json({ message: 'Error in Update Location' });
    }
}


export async function handlerDeleteLocation (req: Request, res: Response) {
    try{
        const idFromParams = req.params.id;
        const location = await deleteLocation(idFromParams);
        if(!location) {
            return res.status(404).json({
                message: 'Location not deleted'
            });
        } else {
            return res.status(200).json(location);
        }
    } catch(err) {
        res.status(500).json({ message: 'Error in Delete Location' });
    }
}
