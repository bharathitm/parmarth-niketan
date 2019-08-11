import express from 'express';
import * as requestsCtrl from '../controllers/request.controller';


const router = express.Router();

router.route('/')
      // Get all requests count
      .get((req, res) => {
        requestsCtrl.getRequestsCount(req, res);
    });

router.route('/:id')

    .get( (req, res) => {
        switch (req.params.id){
            case "1":
                requestsCtrl.getGeneralRequests(req, res);
                break;
            case "2":
                requestsCtrl.getRetreatRequests(req, res);
                break;
            case "3":
                requestsCtrl.getSanskaraRequests(req, res);
                break;
            case "4":
                requestsCtrl.getAgentRequests(req, res);
                break;
        }
    })

    //removes reservation request 
    .delete((req, res) => {
        console.log("in route file");
        requestsCtrl.cancel(req, res);
    });


export default router;