export interface HistoryDto {
  name: string
  action: string
}

export interface UpdateHistoryDto extends Partial<HistoryDto> {}

export interface HistoryData {
  id: string
  name: string
  action: string
}
