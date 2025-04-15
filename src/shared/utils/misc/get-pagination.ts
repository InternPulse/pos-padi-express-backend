export type Pagination = {
  page: number
  limit: number
}

export default function getPagination(
  pagination: Pagination,
  count: number,
  total_records: number,
) {
  const { page = 1, limit = 20 } = pagination

  const totalPages = Math.ceil(total_records / limit)
  const hasPrevious = Boolean(page - 1)
  const hasNext = totalPages > page

  let start = page
  if (page > 1) start = limit * (page - 1) + 1
  let end = start + limit - 1
  if (start > total_records) start = total_records
  if (end > total_records) end = total_records

  return {
    page,
    limit,
    count,
    total_records,
    total_pages: totalPages,
    has_previous: hasPrevious,
    has_next: hasNext,
    description: `${start} to ${end} of ${total_records}`,
  }
}
