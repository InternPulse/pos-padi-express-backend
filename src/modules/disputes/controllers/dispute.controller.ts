import { NextFunction, Request, Response } from "express"
import {
  createDispute,
  getAllDisputes,
  getDisputeById,
  updateDispute,
  deleteDispute,
  // getDisputeStats,
} from "../services/dispute.service"
import { agentIdFromReq } from "../../transaction/utils/id-from-req"

async function getAllDisputesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const agentId = agentIdFromReq(req)
  try {
    const disputes = await getAllDisputes(req.query, agentId)
    res.status(200).json(disputes)
  } catch (error: any) {
    next(error)
  }
}

async function createDisputeController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = { ...req.body, user_id: req.user.user_id }
    const dispute = await createDispute(data, req.user)
    res.status(201).json(dispute)
  } catch (error: any) {
    next(error)
  }
}
async function getDisputeByIdController(req: Request, res: Response) {
  try {
    const dispute = await getDisputeById(req.params.id)
    if (!dispute) {
      res.status(404).json({ error: "Dispute not found" })
      return
    }
    res.status(200).json(dispute)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
async function updateDisputeController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const dispute = await updateDispute(req.params.id, req.body)
    if (!dispute) {
      res.status(404).json({ error: "Dispute not found" })
      return
    }
    res.status(200).json(dispute)
  } catch (error: any) {
    next(error)
  }
}
async function deleteDisputeController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const dispute = await deleteDispute(req.params.id)
    if (!dispute) {
      res.status(404).json({ error: "Dispute not found" })
      return
    }
    res.status(200).json(dispute)
  } catch (error: any) {
    next(error)
  }
}
async function getDisputeStatsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    return res.status(501).json({
      message: "Not implemented yet from dispute controller",
    })
  } catch (error) {
    next(error)
  }
  // try {
  //   const stats = await getDisputeStats()
  //   res.status(200).json(stats)
  // } catch (error: any) {
  //   next(error)
  // }
}

export {
  getAllDisputesController,
  createDisputeController,
  getDisputeByIdController,
  getDisputeStatsController,
  deleteDisputeController,
  updateDisputeController,
}
