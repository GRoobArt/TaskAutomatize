export interface ActionDto {
  name: string
  notion: string
}

export interface UpdateActionDto extends Partial<ActionDto> {
  database?: string
}

export interface ActionData {
  id: string
  name: string
  notion: string
}
