export interface Tour {
  tourID: number;
  tourName: string;
  destination: string;
  availability: number;
  status: string;
  planList: TourPlan[];
}

export interface TourPlan {
  tourPlanID: number;
  startName: string;
  startAddress: string;
  startDate: Date;
  tourID: number;
}

export const TourList: Tour[] = [
  {
    tourID: 1,
    tourName: 'Tour đến Disneyland',
    destination: 'Disneyland, Ohio, USA',
    status: 'Chưa bắt đầu',
    availability: 35,
    planList: [
      {
        tourPlanID: 1,
        startName: 'ABC',
        startAddress: 'DEF',
        startDate: new Date(),
        tourID: 1,
      },
    ],
  },
];

export function getTourByID(id: number) {
  return TourList.find((tourPlanID) => tourPlanID.tourID == id);
}
