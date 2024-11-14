export interface ProjectDto {
  name: string
  notion: string
  complete: number
  pending: number
  count: number
  priority: number
  url: string
  type?: string[]
  database?: string
}

export interface UpdateProjectDto extends Partial<ProjectDto> {}

export interface ProjectData {
  id: string
  name: string
  notion: string
  complete: number
  pending: number
  count: number
  createdAt: Date
  priority: number
  url: string
}
