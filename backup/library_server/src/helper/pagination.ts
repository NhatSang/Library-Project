import { Request } from "express";

export class Pagination {
  total: number;
  page: number;
  limit: number;
  constructor(page: number, limit: number, total?: number) {
    this.total = total;
    this.page = page;
    this.limit = limit;
  }
  getOffset = () => {
    return (this.page - 1) * this.limit;
  };

  static fromRequest(req: Request) {
    const page = parseInt(req.body.page) || 1;
    const limit = parseInt(req.body.limit) || 50;
    return new Pagination(page, limit);
  }
}
