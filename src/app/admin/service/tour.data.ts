export interface Tour {
  tourId: number;
  tourName: string;
  destination: string;
  availability: number;
  status: string;
  planList: TourPlan[];
}

export interface TourPlan {
  tourPlanId: number;
  startName: string;
  startAddress: string;
  startDate: Date;
  tourId: number;
  planDetailList: TourPlanDetail[];
}

export interface TourPlanDetail {
  tourPlanDetailID: number;
  startTime: Date;
  endTime: Date;
  description: string;
  tourPlanId: number;
}

export interface Creator {

}

export const TourList: Tour[] = [
  {
    tourId: 1,
    tourName: 'Tour đến Disneyland',
    destination: 'Disneyland, Ohio, USA',
    status: 'Chưa bắt đầu',
    availability: 35,
    planList: [
      {
        tourPlanId: 1,
        startName: 'ABC',
        startAddress: 'DEF',
        startDate: new Date(),
        tourId: 1,
        planDetailList: [
          {
            tourPlanDetailID: 1,
            startTime: new Date(),
            endTime: new Date(),
            description: 'abc',
            tourPlanId: 1,
          },
        ],
      },
    ],
  },
];

export function getTourByID(id: number) {
  return TourList.find((Tour) => Tour.tourId == id);
}

// export function getTourPlanByID(id) {
//   return TourList.find((Tour) => Tour.planList.tourPlanId == id);
// }
