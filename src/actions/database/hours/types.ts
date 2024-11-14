export interface HourDto {
  notion: string
  name: string
  time: number
  area: string
  action: string
}

export interface UpdateHourDto extends Partial<HourDto> {
  database?: string
}

export interface HourData {}
