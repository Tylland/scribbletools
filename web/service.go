package web

import (
	"embed"
	"fmt"
	"io"
	"log"
	"mime"
	"net/http"
	"path/filepath"
	"strings"
)

//go:embed assets/**/*
var assets embed.FS

//go:embed index.html
var indexHTML embed.FS

//go:embed components/*
var components embed.FS

//go:embed libraries/**/*
var libraries embed.FS

func StartServer() {
	mux := http.NewServeMux()

	// Serve index.html directly
	mux.HandleFunc("/index.html", func(w http.ResponseWriter, r *http.Request) {
		content, err := indexHTML.ReadFile("index.html")
		if err != nil {
			http.Error(w, "Could not read index.html", http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "text/html")
		w.Write(content)
	})

	// Redirect root to index.html
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/" {
			http.Redirect(w, r, "/index.html", http.StatusFound)
		} else {
			http.NotFound(w, r)
		}
	})

	// Redirect chevrotain
	mux.HandleFunc("/assets/chevrotain/chevrotain", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "/assets/js/chevrotain.mjs", http.StatusFound)
	})

	// mux.HandleFunc("/wheel/{scribble}", func(w http.ResponseWriter, r *http.Request) {
	// 	http.Redirect(w, r, "/assets/js/chevrotain.mjs", http.StatusFound)
	// })

	mux.Handle("/assets/js/", AssetImportServer("/assets/", "assets", "application/javascript", http.FS(assets)))
	mux.Handle("/assets/css/", AssetImportServer("/assets/", "assets", "text/css", http.FS(assets)))

	mux.Handle("/libraries/", http.StripPrefix("/", &DebugHandler{fs: libraries}))
	mux.Handle("/components/", http.StripPrefix("/", http.FileServer(http.FS(components))))

	server := &http.Server{
		Addr:    ":8080",
		Handler: mux,
	}

	log.Println("Starting server on :8080")

	log.Println("Starting server on http://localhost:8080")

	if err := server.ListenAndServe(); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}

type DebugHandler struct {
	fs embed.FS
}

func (h *DebugHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Print(r.URL.Path)

	http.FileServer(http.FS(h.fs)).ServeHTTP(w, r)
}

func AssetImportServer(prefix string, directory string, mimeType string, fs http.FileSystem) http.Handler {
	return &assetImportHandler{prefix: prefix, directory: directory, mimeType: mimeType, fs: fs}
}

type assetImportHandler struct {
	prefix    string
	directory string
	fs        http.FileSystem
	mimeType  string
}

func (h *assetImportHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	filename := h.directory + "/" + strings.TrimPrefix(r.URL.Path, h.prefix)

	file, err := h.fs.Open(filename)

	if err != nil {
		http.NotFound(w, r)
		return
	}
	defer file.Close()

	content, err := io.ReadAll(file)

	if err != nil {
		http.Error(w, "Failed to read file", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", h.mimeType)

	w.Write(content)
}

func (f *assetImportHandler) getMimeType(filename string) string {
	ext := filepath.Ext(filename)

	if ext == ".mjs" {
		return "application/javascript"
	}

	mimeType := mime.TypeByExtension(ext)

	if mimeType == "" {
		mimeType = "application/octet-stream"
	}

	return mimeType
}
