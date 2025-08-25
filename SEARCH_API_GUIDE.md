# Hướng dẫn xây dựng API tìm kiếm phim cho Backend (Java Spring Boot)

Đây là tài liệu hướng dẫn cho đội ngũ backend về cách triển khai API tìm kiếm phim cho dự án.

## 1. Tổng quan

API này cho phép người dùng tìm kiếm phim dựa trên một chuỗi truy vấn (query string). Kết quả trả về sẽ là một danh sách các bộ phim phù hợp với tiêu chí tìm kiếm.

## 2. Chi tiết Endpoint

- **HTTP Method:** `GET`
- **URL:** `/api/v1/movies/search`

## 3. Request

### Tham số truy vấn (Query Parameters)

| Tên tham số | Kiểu dữ liệu | Bắt buộc | Mô tả                                          |
| :---------- | :----------- | :------- | :--------------------------------------------- |
| `query`     | `String`     | Có       | Từ khóa tìm kiếm do người dùng nhập.           |
| `page`      | `int`        | Không    | Số trang (mặc định là `1` nếu không có).       |
| `limit`     | `int`        | Không    | Số lượng kết quả mỗi trang (mặc định là `10`). |

### Ví dụ Request

```http
GET /api/v1/movies/search?query=Inception&page=1&limit=20
```

## 4. Response

### Response thành công (200 OK)

Khi tìm thấy kết quả, API sẽ trả về một đối tượng JSON chứa thông tin phân trang và danh sách các bộ phim.

**Cấu trúc đối tượng `Movie`:**

```json
{
  "movieID": 1,
  "title": "Inception",
  "description": "A thief who steals corporate secrets through the use of dream-sharing technology...",
  "duration": 148,
  "year": 2010,
  "poster": "https://example.com/posters/inception.jpg",
  "accessLevel": "premium",
  "trailerURL": "https://youtube.com/watch?v=...",
  "videoURL": "https://example.com/videos/inception.mp4",
  "genres": [
    { "genreID": 1, "name": "Action" },
    { "genreID": 2, "name": "Sci-Fi" }
  ]
}
```

**Ví dụ Response thành công:**

```json
{
  "data": [
    {
      "movieID": 1,
      "title": "Inception",
      "description": "...",
      "year": 2010,
      "poster": "https://example.com/posters/inception.jpg",
      "...": "..."
    },
    {
      "movieID": 2,
      "title": "The Dark Knight: Inception of a Legend",
      "description": "...",
      "year": 2012,
      "poster": "https://example.com/posters/dark_knight.jpg",
      "...": "..."
    }
  ],
  "totalPages": 5,
  "currentPage": 1,
  "totalItems": 100
}
```

### Response không tìm thấy kết quả (200 OK)

Nếu không có bộ phim nào khớp với từ khóa tìm kiếm, API vẫn trả về `200 OK` với mảng `data` rỗng.

```json
{
  "data": [],
  "totalPages": 0,
  "currentPage": 1,
  "totalItems": 0
}
```

### Response lỗi (Error Responses)

- **400 Bad Request:** Nếu tham số `query` bị thiếu hoặc không hợp lệ.
- **500 Internal Server Error:** Nếu có lỗi xảy ra ở phía server.

## 5. Gợi ý triển khai với Spring Boot

### Controller

Sử dụng `@RestController` và `@GetMapping` để định nghĩa endpoint.

```java
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/movies")
public class MovieController {

    // Inject MovieService here
    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchMovies(
            @RequestParam("query") String query,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit) {

        if (query == null || query.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Query parameter cannot be empty.");
        }

        // Gọi service để thực hiện logic tìm kiếm và phân trang
        // PagedResult<MovieDTO> results = movieService.search(query, page, limit);

        // return ResponseEntity.ok(results);
    }
}
```

### Service

Logic tìm kiếm nên được đặt trong tầng `Service`. Bạn có thể sử dụng Spring Data JPA với một phương thức query trong `Repository`.

### Repository

Để tìm kiếm, bạn có thể sử dụng `JPQL` hoặc `native query` với toán tử `LIKE` hoặc sử dụng một giải pháp tìm kiếm full-text như **Elasticsearch** hoặc **Meilisearch** để có hiệu suất tốt hơn.

**Ví dụ với JPQL trong `MovieRepository`:**

```java
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    @Query("SELECT m FROM Movie m WHERE LOWER(m.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(m.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Movie> searchMovies(@Param("query") String query, Pageable pageable);

}

```

Chúc đội ngũ backend triển khai thành công!
