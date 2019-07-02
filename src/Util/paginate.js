class Paginate {
  normalize (query, defaultSize = 20) {
    const pageSize = query.pageSize ? parseInt(query.pageSize) : defaultSize
    const pageIndex = query.pageIndex ? parseInt(query.pageIndex) : 1
    let limit = pageSize; let skip = 0

    if (pageIndex > 1) {
      skip = limit * (pageIndex - 1)
    }

    return {
      pageSize,
      pageIndex,
      limit,
      skip
    }
  }
}

module.exports = new Paginate()
