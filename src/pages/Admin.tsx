import { useState, useEffect, ChangeEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AnimatedCounter from "@/components/AnimatedCounter";
import {
  Lock,
  Plus,
  Trash2,
  Edit,
  Mail,
  Eye,
  EyeOff,
  LogOut,
  X,
  Check,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  category: "student" | "business";
  image_url: string | null;
  technologies: string[];
  features: string[];
  demo_url: string | null;
}

interface ProjectRequest {
  id: string;
  request_type: "trial" | "graduation";
  name: string;
  email: string;
  phone: string | null;
  project_id: string | null;
  details: string;
  company_name: string | null;
  is_read: boolean;
  created_at: string;
  projects: { id: string; title: string; category: string } | null;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSetup, setIsSetup] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"projects" | "requests">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [requests, setRequests] = useState<ProjectRequest[]>([]);
  const [pageViewsCount, setPageViewsCount] = useState<number>(0);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    category: "student" as "student" | "business",
    image_url: "",
    technologies: "",
    features: "",
    demo_url: "",
  });

  // Upload state for direct CDN (Supabase Storage) uploads
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // file input ref so we can trigger click programmatically (more reliable than label-for on some browsers)
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Image picker (list existing files from the project-images bucket)
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [storageImages, setStorageImages] = useState<Array<{ name: string; publicUrl: string }>>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [imagePickerError, setImagePickerError] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    checkSetup();
    const token = sessionStorage.getItem("admin_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
      fetchRequests();
      fetchPageViews();
    }
  }, [isAuthenticated]);

  const checkSetup = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("admin-auth", {
        body: { action: "check-setup" },
      });
      if (!error && data) {
        setIsSetup(data.isSetup);
      }
    } catch {
      setIsSetup(false);
    }
  };

  const handleSetup = async () => {
    if (newPassword.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-auth", {
        body: { action: "setup", newPassword },
      });

      if (error || data?.error) {
        throw new Error(data?.error || "Setup failed");
      }

      toast({ title: "Admin password set up successfully!" });
      setIsSetup(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Setup failed";
      toast({ title: message, variant: "destructive" });
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-auth", {
        body: { action: "login", password },
      });

      if (error || data?.error) {
        throw new Error(data?.error || "Invalid password");
      }

      sessionStorage.setItem("admin_token", data.token);
      setIsAuthenticated(true);
      toast({ title: "Login successful!" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      toast({ title: message, variant: "destructive" });
    }
    setLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    setPassword("");
  };

  const fetchProjects = async () => {
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (data) setProjects(data as Project[]);
  };

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("admin-requests", {
        body: { action: "list" },
      });
      if (!error && data?.requests) {
        setRequests(data.requests);
      }
    } catch {
      console.error("Error fetching requests");
    }
  };

  const fetchPageViews = async () => {
    try {
      // Use head:true + count: 'exact' to get the total rows without fetching them
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { count, error } = await (supabase as any).from("page_views").select("*", { count: "exact", head: true });
      if (!error) setPageViewsCount(count ?? 0);
    } catch {
      console.error("Error fetching page views");
    }
  };

  const openProjectModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setProjectForm({
        title: project.title,
        description: project.description,
        category: project.category,
        image_url: project.image_url || "",
        technologies: project.technologies.join(", "),
        features: project.features.join("\n"),
        demo_url: project.demo_url || "",
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        title: "",
        description: "",
        category: "student",
        image_url: "",
        technologies: "",
        features: "",
        demo_url: "",
      });
    }
    setShowProjectModal(true);
  };

  const saveProject = async () => {
    if (!projectForm.title || !projectForm.description) {
      toast({ title: "Title and description are required", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const projectData = {
        title: projectForm.title,
        description: projectForm.description,
        category: projectForm.category,
        image_url: projectForm.image_url || null,
        technologies: projectForm.technologies.split(",").map((t) => t.trim()).filter(Boolean),
        features: projectForm.features.split("\n").map((f) => f.trim()).filter(Boolean),
        demo_url: projectForm.demo_url || null,
      };  

      const { error } = await supabase.functions.invoke("admin-projects", {
        body: editingProject
          ? { action: "update", projectId: editingProject.id, project: projectData }
          : { action: "create", project: projectData },
      });

      if (error) throw error;

      toast({ title: editingProject ? "Project updated!" : "Project created!" });
      setShowProjectModal(false);
      fetchProjects();
    } catch {
      toast({ title: "Error saving project", variant: "destructive" });
    }
    setLoading(false);
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await supabase.functions.invoke("admin-projects", {
        body: { action: "delete", projectId: id },
      });
      toast({ title: "Project deleted" });
      fetchProjects();
    } catch {
      toast({ title: "Error deleting project", variant: "destructive" });
    }
  };

  const markRequestRead = async (id: string) => {
    try {
      await supabase.functions.invoke("admin-requests", {
        body: { action: "mark-read", requestId: id },
      });
      fetchRequests();
    } catch {
      console.error("Error marking request as read");
    }
  };

  const deleteRequest = async (id: string) => {
    if (!confirm("Delete this request?")) return;
    try {
      await supabase.functions.invoke("admin-requests", {
        body: { action: "delete", requestId: id },
      });
      fetchRequests();
    } catch {
      console.error("Error deleting request");
    }
  };

  // Upload a file directly to Supabase Storage and return its public URL
  const uploadImageFile = async (file: File) => {
    // Bucket name used by server functions is 'project-images' by default
    const BUCKET = (import.meta.env.VITE_SUPABASE_PROJECT_IMAGES_BUCKET as string) || "project-images";
    try {
      setUploadError(null);
      setUploading(true);
      const fileExt = (file.name.split(".").pop() || "png").toLowerCase();
      const filePath = `projects/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

      const { error: uploadErr } = await supabase.storage.from(BUCKET).upload(filePath, file, {
        contentType: file.type,
        upsert: false,
      });

      if (uploadErr) throw uploadErr;

      const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
      return publicData.publicUrl;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setUploadError(message);
      toast({ title: message, variant: "destructive" });
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const publicUrl = await uploadImageFile(file);
      setProjectForm((prev) => ({ ...prev, image_url: publicUrl }));
      toast({ title: "Image uploaded and set" });
    } catch (err) {
      // error handling is done in uploadImageFile
    }
  };

  // List files from the storage bucket (projects folder)
  const fetchStorageImages = async () => {
    const BUCKET = (import.meta.env.VITE_SUPABASE_PROJECT_IMAGES_BUCKET as string) || "project-images";
    try {
      setImagePickerError(null);
      setLoadingImages(true);
      const { data, error } = await supabase.storage.from(BUCKET).list("projects", { limit: 200, offset: 0, sortBy: { column: "name", order: "asc" } });
      if (error) throw error;

      const images = (data || []).map((file) => {
        const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(file.name);
        return { name: file.name, publicUrl: publicData.publicUrl };
      });

      setStorageImages(images);
    } catch (err: unknown) {
      setImagePickerError(err instanceof Error ? err.message : "Failed to load images");
    } finally {
      setLoadingImages(false);
    }
  };

  // Setup Screen
  if (isSetup === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isSetup) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Setup</h1>
            <p className="text-muted-foreground mt-2">Create your admin password</p>
          </div>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="New password (min 6 characters)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button className="w-full" onClick={handleSetup} disabled={loading}>
              {loading ? "Setting up..." : "Set Password"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
            <p className="text-muted-foreground mt-2">Enter your admin password</p>
          </div>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <Button className="w-full" onClick={handleLogin} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-foreground">Devora Admin</h1>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="text-xs">Site visits</span>
              <AnimatedCounter end={pageViewsCount} className="font-semibold text-foreground" />
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === "projects"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`px-6 py-2 rounded-lg font-medium transition-all relative ${
              activeTab === "requests"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            Requests
            {requests.filter((r) => !r.is_read).length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {requests.filter((r) => !r.is_read).length}
              </span>
            )}
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Projects</h2>
              <Button onClick={() => openProjectModal()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>

            <div className="grid gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-card border border-border rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold">{project.title[0]}</span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-foreground">{project.title}</h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          project.category === "student"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => openProjectModal(project)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => deleteProject(project.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No projects yet</p>
              )}
            </div>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === "requests" && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Requests</h2>
            <div className="grid gap-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className={`bg-card border rounded-xl p-4 ${
                    request.is_read ? "border-border" : "border-primary"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          request.request_type === "graduation"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {request.request_type === "graduation" ? "Graduation Project" : "Trial Request"}
                      </span>
                      {!request.is_read && (
                        <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded">New</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {!request.is_read && (
                        <Button variant="ghost" size="sm" onClick={() => markRequestRead(request.id)}>
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500"
                        onClick={() => deleteRequest(request.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">{request.name}</p>
                    <p className="text-muted-foreground text-sm flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {request.email}
                      {request.phone && ` • ${request.phone}`}
                    </p>
                    {request.company_name && (
                      <p className="text-muted-foreground text-sm">Company: {request.company_name}</p>
                    )}
                    {request.projects && (
                      <p className="text-muted-foreground text-sm">
                        Project: {request.projects.title}
                      </p>
                    )}
                    <p className="text-foreground bg-secondary p-3 rounded-lg text-sm mt-2">
                      {request.details}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(request.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              {requests.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No requests yet</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h3 className="text-xl font-bold text-foreground">
                {editingProject ? "Edit Project" : "New Project"}
              </h3>
              <button onClick={() => setShowProjectModal(false)}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Title *</label>
                <Input
                  placeholder="Project title"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Description *</label>
                <Textarea
                  placeholder="Project description"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Category</label>
                <select
                  className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground"
                  value={projectForm.category}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, category: e.target.value as "student" | "business" })
                  }
                >
                  <option value="student">Student</option>
                  <option value="business">Business</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Image URL or Upload</label>

                <Input
                  placeholder="https://..."
                  value={projectForm.image_url}
                  onChange={(e) => setProjectForm({ ...projectForm, image_url: e.target.value })}
                />

                <div className="mt-2 flex items-center gap-3">
                  <input
                    ref={fileInputRef}
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />

                  <Button
                    variant="outline"
                    disabled={uploading}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {uploading ? "Uploading..." : "Upload Image"}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={async () => {
                      try {
                        // Open picker and lazy-load images
                        setShowImagePicker(true);
                        if (storageImages.length === 0) await fetchStorageImages();
                      } catch (e) {
                        // errors handled in fetchStorageImages
                      }
                    }}
                  >
                    Choose Existing
                  </Button>

                  {projectForm.image_url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setProjectForm({ ...projectForm, image_url: "" })}
                    >
                      Remove
                    </Button>
                  )}
                </div>

                {/* Preview */}
                <div className="mt-3">
                  {projectForm.image_url ? (
                    <div className="w-48 h-32 bg-secondary rounded-lg overflow-hidden flex items-center justify-center">
                      <img
                        src={projectForm.image_url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={() => setUploadError("Unable to load preview")}
                        onLoad={() => setUploadError(null)}
                      />
                    </div>
                  ) : (
                    <div className="text-muted-foreground text-sm">No image selected</div>
                  )}

                  {uploadError && (
                    <p className="text-xs text-red-500 mt-1">{uploadError}</p>
                  )}
                </div>

                {/* Image Picker Modal */}
                {showImagePicker && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-card border border-border rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Choose Existing Image</h3>
                        <button onClick={() => setShowImagePicker(false)}>
                          <X className="w-5 h-5 text-muted-foreground" />
                        </button>
                      </div>

                      {loadingImages ? (
                        <div className="text-center py-8">Loading images...</div>
                      ) : imagePickerError ? (
                        <p className="text-red-500">{imagePickerError}</p>
                      ) : storageImages.length === 0 ? (
                        <p className="text-muted-foreground">No images found in bucket</p>
                      ) : (
                        <div className="grid grid-cols-3 gap-3">
                          {storageImages.map((img) => (
                            <div
                              key={img.name}
                              className="cursor-pointer border rounded overflow-hidden"
                              onClick={() => {
                                setProjectForm((prev) => ({ ...prev, image_url: img.publicUrl }));
                                setShowImagePicker(false);
                                toast({ title: "Image selected" });
                              }}
                            >
                              <img src={img.publicUrl} alt={img.name} className="w-full h-32 object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Technologies (comma-separated)
                </label>
                <Input
                  placeholder="React, Node.js, PostgreSQL"
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Features (one per line)
                </label>
                <Textarea
                  placeholder="User authentication&#10;Dashboard&#10;Reports"
                  value={projectForm.features}
                  onChange={(e) => setProjectForm({ ...projectForm, features: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Demo URL</label>
                <Input
                  placeholder="https://..."
                  value={projectForm.demo_url}
                  onChange={(e) => setProjectForm({ ...projectForm, demo_url: e.target.value })}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowProjectModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={saveProject} disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;