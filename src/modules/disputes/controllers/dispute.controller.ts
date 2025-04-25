import { NextFunction, Request, Response } from "express"
import {
  createDispute,
  getAllDisputes,
  getDisputeById,
  updateDispute,
  deleteDispute,
  getDisputeStats,
} from "../services/dispute.service"

async function getAllDisputesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const disputes = await getAllDisputes(req.query)
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
    console.log(req.user, "hello2")
    const dispute = await createDispute(req.body)
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
    const stats = await getDisputeStats()
    res.status(200).json(stats)
  } catch (error: any) {
    next(error)
  }
}

export {
  getAllDisputesController,
  createDisputeController,
  getDisputeByIdController,
  getDisputeStatsController,
  deleteDisputeController,
  updateDisputeController,
}
