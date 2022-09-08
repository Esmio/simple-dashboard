import { Request, Response } from 'express';

export const getSales = async (req: Request, res: Response) => {
  res.json({
    code: 0,
    data: [
      {
        week: 'Mon',
        value: 150,
      },
      {
        week: 'Tue',
        value: 230,
      },
      {
        week: 'Wed',
        value: 224,
      },
      {
        week: 'Thu',
        value: 218,
      },
      {
        week: 'Fri',
        value: 135,
      },
      {
        week: 'Sat',
        value: 147,
      },
      {
        week: 'Sun',
        value: 260,
      },
    ],
    msg: 'success',
  });
};
