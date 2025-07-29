    // Study Hub Extra Features Component: notes, Whiteboard, Todos, Resources, Flashcards, Calendar

    "use client";

    import { useState, useRef, useEffect } from "react";
    import { 
    BookOpen,
    PenTool,
    CheckSquare,
    Calendar,
    Bookmark,
    Brain,
    Target,
    Trophy,
    Star,
    Heart,
    Sparkles,
    Wand2,
    Rocket,
    Crown,
    Zap,
    Plus,
    Save,
    Trash2,
    Edit3,
    Download,
    Upload,
    Search,
    Filter,
    Clock,
    User,
    MapPin,
    Link,
    Camera,
    Mic,
    Play,
    Pause,
    RotateCcw,
    Copy,
    Share2,
    FileText,
    Lightbulb,
    Coffee,
    AlertCircle,
    CheckCircle,
    XCircle,
    Timer,
    TrendingUp,
    BarChart3,
    PieChart,
    Activity,
    Folder,
    Tag,
    MessageSquare,
    Settings,
    Archive,
    Grid3X3,
    Grid
    } from "lucide-react";

    const ExtraFeatures = () => {
    const [activeTab, setActiveTab] = useState("notes");
    const [sparkleAnimation, setSparkleAnimation] = useState(false);
    
    // Notes State
    const [notes, setNotes] = useState([
        {
        id: 1,
        title: "Mock Interview Learnings",
        content: "Learned to structure answers using STAR method. Need to practice more behavioral questions.",
        category: "MockInterview",
        date: "2024-01-15",
        tags: ["STAR", "behavioral", "practice"]
        },
        {
        id: 2,
        title: "DSA Progress",
        content: "Completed Two Pointer problems. Understanding sliding window technique better now.",
        category: "DSA",
        date: "2024-01-14",
        tags: ["algorithms", "two-pointer", "sliding-window"]
        }
    ]);
    const [noteForm, setNoteForm] = useState({ title: "", content: "", category: "General", tags: "" });
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Whiteboard State
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tool, setTool] = useState("pen");
    const [color, setColor] = useState("#000000");
    const [brushSize, setBrushSize] = useState(3);
    const [whiteboardTemplates] = useState([
        "System Design", "Database Schema", "Algorithm Flow", "Network Architecture", "Blank Canvas"
    ]);

    // Todo State - No default data
    const [todos, setTodos] = useState([]);
    const [todoForm, setTodoForm] = useState({
        task: "", priority: "Medium", dueDate: "", category: "Study", estimatedTime: ""
    });

    // Resources State - No default data
    const [resources, setResources] = useState([]);
    const [resourceForm, setResourceForm] = useState({
        title: "", url: "", category: "Study Material", description: "", rating: 5
    });

    // Flashcards State
    const [flashcards, setFlashcards] = useState([
        {
        id: 1,
        question: "What is the time complexity of Binary Search?",
        answer: "O(log n) - because we eliminate half the search space in each iteration",
        category: "DSA",
        difficulty: "Easy",
        lastReviewed: "2024-01-15"
        },
        {
        id: 2,
        question: "Explain the STAR method",
        answer: "Situation, Task, Action, Result - framework for answering behavioral questions",
        category: "Behavioral",
        difficulty: "Medium",
        lastReviewed: "2024-01-14"
        }
    ]);
    const [flashcardForm, setFlashcardForm] = useState({
        question: "", answer: "", category: "DSA", difficulty: "Medium"
    });
    const [currentFlashcard, setCurrentFlashcard] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    // Calendar State - No default data
    const [interviews, setInterviews] = useState([]);
    const [interviewForm, setInterviewForm] = useState({
        company: "", position: "", date: "", time: "", type: "Technical Interview", notes: ""
    });

    useEffect(() => {
        const sparkleInterval = setInterval(() => {
        setSparkleAnimation(true);
        setTimeout(() => setSparkleAnimation(false), 1000);
        }, 4000);
        return () => clearInterval(sparkleInterval);
    }, []);

    // Note Functions
    const addNote = () => {
        if (!noteForm.title.trim() || !noteForm.content.trim()) return;
        
        const newNote = {
        id: Date.now(),
        ...noteForm,
        date: new Date().toISOString().split('T')[0],
        tags: noteForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        };
        
        setNotes([newNote, ...notes]);
        setNoteForm({ title: "", content: "", category: "General", tags: "" });
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const filteredNotes = notes.filter(note => {
        const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            note.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || note.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Whiteboard Functions
    const startDrawing = (e) => {
        setIsDrawing(true);
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        
        if (tool === "eraser") {
        ctx.globalCompositeOperation = 'destination-out';
        } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = color;
        }
        
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const downloadCanvas = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = 'whiteboard.png';
        link.href = canvas.toDataURL();
        link.click();
    };

    // Todo Functions
    const addTodo = () => {
        if (!todoForm.task.trim()) return;
        
        const newTodo = {
        id: Date.now(),
        ...todoForm,
        completed: false
        };
        
        setTodos([...todos, newTodo]);
        setTodoForm({ task: "", priority: "Medium", dueDate: "", category: "Study", estimatedTime: "" });
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    // Resource Functions
    const addResource = () => {
        if (!resourceForm.title.trim() || !resourceForm.url.trim()) return;
        
        const newResource = {
        id: Date.now(),
        ...resourceForm,
        dateAdded: new Date().toISOString().split('T')[0]
        };
        
        setResources([newResource, ...resources]);
        setResourceForm({ title: "", url: "", category: "Study Material", description: "", rating: 5 });
    };

    const deleteResource = (id) => {
        setResources(resources.filter(resource => resource.id !== id));
    };

    // Flashcard Functions
    const addFlashcard = () => {
        if (!flashcardForm.question.trim() || !flashcardForm.answer.trim()) return;
        
        const newFlashcard = {
        id: Date.now(),
        ...flashcardForm,
        lastReviewed: new Date().toISOString().split('T')[0]
        };
        
        setFlashcards([...flashcards, newFlashcard]);
        setFlashcardForm({ question: "", answer: "", category: "DSA", difficulty: "Medium" });
    };

    const deleteFlashcard = (id) => {
        setFlashcards(flashcards.filter(card => card.id !== id));
        // Adjust current flashcard index if needed
        if (currentFlashcard >= flashcards.length - 1) {
        setCurrentFlashcard(Math.max(0, flashcards.length - 2));
        }
        setShowAnswer(false);
    };

    const nextFlashcard = () => {
        if (flashcards.length > 0) {
        setCurrentFlashcard((prev) => (prev + 1) % flashcards.length);
        setShowAnswer(false);
        }
    };

    const prevFlashcard = () => {
        if (flashcards.length > 0) {
        setCurrentFlashcard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
        setShowAnswer(false);
        }
    };

    // Interview Calendar Functions
    const addInterview = () => {
        if (!interviewForm.company.trim() || !interviewForm.date) return;
        
        const newInterview = {
        id: Date.now(),
        ...interviewForm,
        status: "Scheduled"
        };
        
        setInterviews([...interviews, newInterview]);
        setInterviewForm({ company: "", position: "", date: "", time: "", type: "Technical Interview", notes: "" });
    };

    const deleteInterview = (id) => {
        setInterviews(interviews.filter(interview => interview.id !== id));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 p-6">
        {/* Floating decorative elements */}
        <div className="fixed top-10 left-10 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60 z-10"></div>
        <div className="fixed top-20 right-20 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60 z-10"></div>
        <div className="fixed bottom-20 right-40 w-3 h-3 bg-cyan-300 rounded-full animate-ping opacity-60 z-10"></div>
        
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="relative group mb-12">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
            <div className="relative bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 rounded-3xl shadow-2xl p-8 border-2 border-white/50 backdrop-blur-sm">
                
                {/* Decorations */}
                <div className="absolute top-4 right-4 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
                
                <div className="flex items-center gap-4">
                <div className="relative">
                    <div className="p-4 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-2xl shadow-xl">
                    <Crown className="w-10 h-10 text-white" />
                    </div>
                    {sparkleAnimation && (
                    <div className="absolute -top-2 -right-2">
                        <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" />
                    </div>
                    )}
                </div>
                <div>
                    <h1 className="text-4xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2">
                    PersonaIQ Study Hub ✨
                    <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
                    </h1>
                    <p className="text-lg font-bold text-gray-700 mt-2 flex items-center gap-1">
                    <Heart className="w-5 h-5 text-pink-400" />
                    Your complete interview prep workspace! 🚀
                    </p>
                </div>
                </div>
            </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mb-8">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-2xl opacity-20 blur-lg"></div>
                <div className="relative bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 border-2 border-white/50 shadow-xl rounded-2xl p-2 backdrop-blur-sm grid w-full grid-cols-6">
                <button
                    onClick={() => setActiveTab("notes")}
                    className={`rounded-xl font-bold flex items-center justify-center gap-1 text-xs p-3 transition-all ${
                    activeTab === "notes" 
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg" 
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                    }`}
                >
                    <BookOpen className="w-4 h-4" />
                    Notes
                </button>
                <button
                    onClick={() => setActiveTab("whiteboard")}
                    className={`rounded-xl font-bold flex items-center justify-center gap-1 text-xs p-3 transition-all ${
                    activeTab === "whiteboard" 
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg" 
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                    }`}
                >
                    <PenTool className="w-4 h-4" />
                    Whiteboard
                </button>
                <button
                    onClick={() => setActiveTab("todos")}
                    className={`rounded-xl font-bold flex items-center justify-center gap-1 text-xs p-3 transition-all ${
                    activeTab === "todos" 
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg" 
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                    }`}
                >
                    <CheckSquare className="w-4 h-4" />
                    Todos
                </button>
                <button
                    onClick={() => setActiveTab("resources")}
                    className={`rounded-xl font-bold flex items-center justify-center gap-1 text-xs p-3 transition-all ${
                    activeTab === "resources" 
                        ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg" 
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                    }`}
                >
                    <Bookmark className="w-4 h-4" />
                    Resources
                </button>
                <button
                    onClick={() => setActiveTab("flashcards")}
                    className={`rounded-xl font-bold flex items-center justify-center gap-1 text-xs p-3 transition-all ${
                    activeTab === "flashcards" 
                        ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg" 
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                    }`}
                >
                    <Brain className="w-4 h-4" />
                    Flashcards
                </button>
                <button
                    onClick={() => setActiveTab("calendar")}
                    className={`rounded-xl font-bold flex items-center justify-center gap-1 text-xs p-3 transition-all ${
                    activeTab === "calendar" 
                        ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-lg" 
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                    }`}
                >
                    <Calendar className="w-4 h-4" />
                    Calendar
                </button>
                </div>
            </div>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
            {/* Notes Tab */}
            {activeTab === "notes" && (
                <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Add Note Form */}
                <div className="lg:col-span-1">
                    <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl opacity-20 blur-lg"></div>
                    <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm p-6">
                        
                        <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl shadow-lg">
                            <Plus className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            Add New Note ✍️
                        </h2>
                        </div>

                        <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Note title..."
                            value={noteForm.title}
                            onChange={(e) => setNoteForm({...noteForm, title: e.target.value})}
                            className="w-full p-3 rounded-xl border-2 border-blue-200 focus:border-blue-400 focus:outline-none"
                        />
                        
                        <select
                            value={noteForm.category}
                            onChange={(e) => setNoteForm({...noteForm, category: e.target.value})}
                            className="w-full p-3 rounded-xl border-2 border-blue-200 focus:border-blue-400 bg-white focus:outline-none"
                        >
                            <option value="General">General</option>
                            <option value="MockInterview">Mock Interview</option>
                            <option value="DSA">DSA Practice</option>
                            <option value="SystemDesign">System Design</option>
                            <option value="Behavioral">Behavioral</option>
                            <option value="Technical">Technical</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Tags (comma separated)..."
                            value={noteForm.tags}
                            onChange={(e) => setNoteForm({...noteForm, tags: e.target.value})}
                            className="w-full p-3 rounded-xl border-2 border-blue-200 focus:border-blue-400 focus:outline-none"
                        />
                        
                        <textarea
                            placeholder="Write your note here..."
                            value={noteForm.content}
                            onChange={(e) => setNoteForm({...noteForm, content: e.target.value})}
                            className="w-full p-3 min-h-32 rounded-xl border-2 border-blue-200 focus:border-blue-400 focus:outline-none resize-none"
                        />
                        
                        <button
                            onClick={addNote}
                            className="w-full p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold shadow-lg border-0 flex items-center justify-center gap-2 transition-all"
                        >
                            <Save className="w-4 h-4" />
                            Save Note
                        </button>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Notes List */}
                <div className="lg:col-span-2">
                    <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl opacity-20 blur-lg"></div>
                    <div className="relative bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm p-6">
                        
                        <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl shadow-lg">
                            <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            My Study Notes 📚
                            </h2>
                        </div>
                        
                        <div className="flex gap-2">
                            <input
                            type="text"
                            placeholder="Search notes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-48 p-2 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none"
                            />
                            <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-3 py-2 rounded-xl border-2 border-purple-200 focus:border-purple-400 bg-white focus:outline-none"
                            >
                            <option value="All">All Categories</option>
                            <option value="General">General</option>
                            <option value="MockInterview">Mock Interview</option>
                            <option value="DSA">DSA Practice</option>
                            <option value="SystemDesign">System Design</option>
                            <option value="Behavioral">Behavioral</option>
                            <option value="Technical">Technical</option>
                            </select>
                        </div>
                        </div>

                        <div className="space-y-4 max-h-96 overflow-y-auto">
                        {filteredNotes.map((note) => (
                            <div key={note.id} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 shadow-lg">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-black text-gray-900">{note.title}</h3>
                                    <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                                    {note.category}
                                    </span>
                                </div>
                                <p className="text-gray-700 font-medium mb-3">{note.content}</p>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Clock className="w-4 h-4" />
                                    {note.date}
                                    {note.tags.length > 0 && (
                                    <>
                                        <span>•</span>
                                        <div className="flex gap-1">
                                        {note.tags.map((tag, index) => (
                                            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                                            #{tag}
                                            </span>
                                        ))}
                                        </div>
                                    </>
                                    )}
                                </div>
                                </div>
                                <button
                                onClick={() => deleteNote(note.id)}
                                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                                >
                                <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            )}

            {/* Whiteboard Tab */}
            {activeTab === "whiteboard" && (
                <div className="space-y-6">
                
                {/* Whiteboard Controls */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl opacity-20 blur-lg"></div>
                    <div className="relative bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm p-6">
                    
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl shadow-lg">
                            <PenTool className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            Technical Whiteboard 🎨
                        </h2>
                        </div>

                        <div className="flex items-center gap-4">
                        {/* Drawing Tools */}
                        <div className="flex gap-2">
                            <button
                            onClick={() => setTool("pen")}
                            className={`p-2 rounded-xl flex items-center gap-2 font-medium transition-all ${
                                tool === "pen" 
                                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white" 
                                : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                            >
                            <Edit3 className="w-4 h-4" />
                            Pen
                            </button>
                            <button
                            onClick={() => setTool("eraser")}
                            className={`p-2 rounded-xl flex items-center gap-2 font-medium transition-all ${
                                tool === "eraser" 
                                ? "bg-gradient-to-r from-red-500 to-rose-500 text-white" 
                                : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                            >
                            <RotateCcw className="w-4 h-4" />
                            Eraser
                            </button>
                        </div>

                        {/* Color Picker */}
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            disabled={tool === "eraser"}
                            className="w-10 h-10 rounded-xl border-2 border-green-200 disabled:opacity-50"
                        />

                        {/* Brush Size */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600">Size:</span>
                            <input
                            type="range"
                            min="1"
                            max="20"
                            value={brushSize}
                            onChange={(e) => setBrushSize(e.target.value)}
                            className="w-20"
                            />
                            <span className="text-sm font-medium text-gray-600 w-8">{brushSize}px</span>
                        </div>

                        {/* Action Buttons */}
                        <button 
                            onClick={clearCanvas} 
                            className="p-2 bg-gradient-to-r from-red-400 to-rose-500 text-white rounded-xl font-medium flex items-center gap-2 hover:from-red-500 hover:to-rose-600 transition-all"
                        >
                            <Trash2 className="w-4 h-4" />
                            Clear
                        </button>
                        <button 
                            onClick={downloadCanvas} 
                            className="p-2 bg-gradient-to-r from-blue-400 to-cyan-500 text-white rounded-xl font-medium flex items-center gap-2 hover:from-blue-500 hover:to-cyan-600 transition-all"
                        >
                            <Download className="w-4 h-4" />
                            Save
                        </button>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Canvas */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gray-400 to-slate-400 rounded-2xl opacity-20 blur-lg"></div>
                    <div className="relative bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-4">
                    <canvas
                        ref={canvasRef}
                        width={800}
                        height={600}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        className="w-full h-96 border-2 border-gray-200 rounded-xl cursor-crosshair"
                        style={{ touchAction: 'none' }}
                    />
                    </div>
                </div>

                {/* Templates */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl opacity-20 blur-lg"></div>
                    <div className="relative bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm p-6">
                    
                    <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                        <Grid className="w-5 h-5 text-purple-500" />
                        Quick Templates 📐
                    </h3>

                    <div className="grid grid-cols-5 gap-4">
                        {whiteboardTemplates.map((template, index) => (
                        <button
                            key={index}
                            className="p-4 h-20 bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-700 font-bold rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all"
                        >
                            {template}
                        </button>
                        ))}
                    </div>
                    </div>
                </div>
                </div>
            )}

            {/* Todos Tab */}
            {activeTab === "todos" && (
                <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Add Todo Form */}
                <div className="lg:col-span-1">
                    <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl opacity-20 blur-lg"></div>
                    <div className="relative bg-gradient-to-br from-white via-orange-50/30 to-red-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm p-6">
                        
                        <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl shadow-lg">
                            <Plus className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            Add New Task 📝
                        </h2>
                        </div>

                        <div className="space-y-4">
                        <textarea
                            placeholder="What do you need to do?"
                            value={todoForm.task}
                            onChange={(e) => setTodoForm({...todoForm, task: e.target.value})}
                            className="w-full p-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 focus:outline-none resize-none"
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                            <select
                            value={todoForm.priority}
                            onChange={(e) => setTodoForm({...todoForm, priority: e.target.value})}
                            className="p-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 bg-white focus:outline-none"
                            >
                            <option value="Low">Low Priority</option>
                            <option value="Medium">Medium Priority</option>
                            <option value="High">High Priority</option>
                            </select>

                            <select
                            value={todoForm.category}
                            onChange={(e) => setTodoForm({...todoForm, category: e.target.value})}
                            className="p-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 bg-white focus:outline-none"
                            >
                            <option value="Study">Study</option>
                            <option value="Practice">Practice</option>
                            <option value="Networking">Networking</option>
                            <option value="Applications">Applications</option>
                            <option value="Research">Research</option>
                            </select>
                        </div>

                        <input
                            type="date"
                            value={todoForm.dueDate}
                            onChange={(e) => setTodoForm({...todoForm, dueDate: e.target.value})}
                            className="w-full p-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 focus:outline-none"
                        />

                        <input
                            type="text"
                            placeholder="Estimated time (e.g., 2 hours)"
                            value={todoForm.estimatedTime}
                            onChange={(e) => setTodoForm({...todoForm, estimatedTime: e.target.value})}
                            className="w-full p-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 focus:outline-none"
                        />
                        
                        <button
                            onClick={addTodo}
                            className="w-full p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold shadow-lg border-0 flex items-center justify-center gap-2 transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            Add Task
                        </button>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Todos List */}
                <div className="lg:col-span-2">
                    <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl opacity-20 blur-lg"></div>
                    <div className="relative bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm p-6">
                        
                        <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl shadow-lg">
                            <CheckSquare className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            My Tasks 📋
                        </h2>
                        </div>

                        <div className="space-y-4 max-h-96 overflow-y-auto">
                        {todos.length === 0 ? (
                            <div className="text-center py-8">
                            <CheckSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 font-medium">No tasks yet. Add your first task to get started!</p>
                            </div>
                        ) : (
                            todos.map((todo) => (
                            <div key={todo.id} className={`p-4 rounded-xl border-2 shadow-lg ${
                                todo.completed 
                                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                                : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200'
                            }`}>
                                <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3 flex-1">
                                    <button
                                    onClick={() => toggleTodo(todo.id)}
                                    className={`mt-1 rounded-full w-6 h-6 p-0 flex items-center justify-center transition-all ${
                                        todo.completed 
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                                        : 'bg-gradient-to-r from-gray-300 to-gray-400'
                                    } text-white border-0`}
                                    >
                                    {todo.completed && <CheckCircle className="w-4 h-4" />}
                                    </button>
                                    
                                    <div className="flex-1">
                                    <p className={`font-bold ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                        {todo.task}
                                    </p>
                                    <div className="flex items-center gap-4 mt-2 text-sm">
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full text-white ${
                                        todo.priority === 'High' ? 'bg-gradient-to-r from-red-500 to-rose-500' :
                                        todo.priority === 'Medium' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                        'bg-gradient-to-r from-green-500 to-emerald-500'
                                        }`}>
                                        {todo.priority}
                                        </span>
                                        <span className="text-gray-600">{todo.category}</span>
                                        {todo.dueDate && (
                                        <span className="text-gray-600 flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {todo.dueDate}
                                        </span>
                                        )}
                                        {todo.estimatedTime && (
                                        <span className="text-gray-600 flex items-center gap-1">
                                            <Timer className="w-4 h-4" />
                                            {todo.estimatedTime}
                                        </span>
                                        )}
                                    </div>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                </div>
                            </div>
                            ))
                        )}
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            )}

            {/* Resources Tab */}
            {activeTab === "resources" && (
                <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Add Resource Form */}
                <div className="lg:col-span-1">
                    <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl opacity-20 blur-lg"></div>
                    <div className="relative bg-gradient-to-br from-white via-teal-50/30 to-cyan-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm p-6">
                        
                        <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-xl shadow-lg">
                            <Plus className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-black bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                            Add Resource 🔗
                        </h2>
                        </div>

                        <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Resource title..."
                            value={resourceForm.title}
                            onChange={(e) => setResourceForm({...resourceForm, title: e.target.value})}
                            className="w-full p-3 rounded-xl border-2 border-teal-200 focus:border-teal-400 focus:outline-none"
                        />
                        
                        <input
                            type="url"
                            placeholder="URL..."
                            value={resourceForm.url}
                            onChange={(e) => setResourceForm({...resourceForm, url: e.target.value})}
                            className="w-full p-3 rounded-xl border-2 border-teal-200 focus:border-teal-400 focus:outline-none"
                        />

                        <select
                            value={resourceForm.category}
                            onChange={(e) => setResourceForm({...resourceForm, category: e.target.value})}
                            className="w-full p-3 rounded-xl border-2 border-teal-200 focus:border-teal-400 bg-white focus:outline-none"
                        >
                            <option value="Study Material">Study Material</option>
                            <option value="Practice">Practice</option>
                            <option value="Tools">Tools</option>
                            <option value="Articles">Articles</option>
                            <option value="Videos">Videos</option>
                            <option value="Courses">Courses</option>
                        </select>
                        
                        <textarea
                            placeholder="Description..."
                            value={resourceForm.description}
                            onChange={(e) => setResourceForm({...resourceForm, description: e.target.value})}
                            className="w-full p-3 rounded-xl border-2 border-teal-200 focus:border-teal-400 focus:outline-none resize-none"
                        />

                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Rating:</span>
                            <div className="flex gap-1">
                            {[1,2,3,4,5].map((star) => (
                                <button
                                key={star}
                                onClick={() => setResourceForm({...resourceForm, rating: star})}
                                className={`w-8 h-8 p-0 rounded-full flex items-center justify-center transition-all ${
                                    star <= resourceForm.rating 
                                    ? 'bg-yellow-400 text-white' 
                                    : 'bg-gray-200 text-gray-400'
                                }`}
                                >
                                <Star className="w-4 h-4" />
                                </button>
                            ))}
                            </div>
                        </div>
                        
                        <button
                            onClick={addResource}
                            className="w-full p-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold shadow-lg border-0 flex items-center justify-center gap-2 transition-all"
                        >
                            <Bookmark className="w-4 h-4" />
                            Save Resource
                        </button>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Resources List */}
                <div className="lg:col-span-2">
                    <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl opacity-20 blur-lg"></div>
                    <div className="relative bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm p-6">
                        
                        <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl shadow-lg">
                            <Bookmark className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            My Resources 📚
                        </h2>
                        </div>

                        <div className="space-y-4 max-h-96 overflow-y-auto">
                        {resources.length === 0 ? (
                            <div className="text-center py-8">
                            <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 font-medium">No resources yet. Add your first study resource!</p>
                            </div>
                        ) : (
                            resources.map((resource) => (
                            <div key={resource.id} className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-200 shadow-lg">
                                <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-black text-gray-900">{resource.title}</h3>
                                    <span className="px-2 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-full">
                                        {resource.category}
                                    </span>
                                    <div className="flex">
                                        {[...Array(resource.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    </div>
                                    <p className="text-gray-700 font-medium mb-3">{resource.description}</p>
                                    <div className="flex items-center gap-4">
                                    <a 
                                        href={resource.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-all"
                                    >
                                        <Link className="w-4 h-4" />
                                        Visit Resource
                                    </a>
                                    <span className="text-sm text-gray-500">Added: {resource.dateAdded}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteResource(resource.id)}
                                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                </div>
                            </div>
                            ))
                        )}
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            )}

            {/* Flashcards Tab */}
            {activeTab === "flashcards" && (
                <div className="grid lg:grid-cols-2 gap-8">
                
                {/* Flashcard Practice */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-2xl opacity-20 blur-lg"></div>
                    <div className="relative bg-gradient-to-br from-white via-rose-50/30 to-pink-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm p-6">
                    
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-rose-400 to-pink-500 rounded-xl shadow-lg">
                            <Brain className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-black bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                            Flashcard Practice 🧠
                        </h2>
                        </div>
                        <div className="text-sm font-medium text-gray-600">
                        {flashcards.length > 0 ? `${currentFlashcard + 1} / ${flashcards.length}` : '0 / 0'}
                        </div>
                    </div>

                    {flashcards.length > 0 ? (
                        <div className="space-y-6">
                        <div className="min-h-64 bg-gradient-to-br from-white to-rose-50 rounded-xl border-2 border-rose-200 p-6 flex flex-col justify-center items-center">
                            <div className="text-center">
                            <div className="mb-4">
                                <span className={`px-2 py-1 text-xs font-bold rounded-full text-white ${
                                flashcards[currentFlashcard].difficulty === 'Easy' ? 'bg-green-500' :
                                flashcards[currentFlashcard].difficulty === 'Medium' ? 'bg-yellow-500' :
                                'bg-red-500'
                                }`}>
                                {flashcards[currentFlashcard].difficulty}
                                </span>
                                <span className="ml-2 px-2 py-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold rounded-full">
                                {flashcards[currentFlashcard].category}
                                </span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-6">
                                {showAnswer ? "Answer:" : "Question:"}
                            </h3>
                            
                            <p className="text-lg font-medium text-gray-800 leading-relaxed">
                                {showAnswer ? flashcards[currentFlashcard].answer : flashcards[currentFlashcard].question}
                            </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                            onClick={prevFlashcard}
                            className="px-4 py-2 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white rounded-xl font-medium transition-all"
                            >
                            Previous
                            </button>
                            
                            <button
                            onClick={() => setShowAnswer(!showAnswer)}
                            className="px-8 py-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl font-medium transition-all"
                            >
                            {showAnswer ? "Show Question" : "Show Answer"}
                            </button>
                            
                            <button
                            onClick={nextFlashcard}
                            className="px-4 py-2 bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white rounded-xl font-medium transition-all"
                            >
                            Next
                            </button>
                        </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                        <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">No flashcards yet. Create your first flashcard to start practicing!</p>
                        </div>
                    )}
                    </div>
                </div>

                {/* Add Flashcard & List */}
                <div className="space-y-6">
                    <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-400 to-purple-400 rounded-2xl opacity-20 blur-lg"></div>
                    <div className="relative bg-gradient-to-br from-white via-violet-50/30 to-purple-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm p-6">
                        
                        <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-r from-violet-400 to-purple-500 rounded-xl shadow-lg">
                            <Plus className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                            Add Flashcard ➕
                        </h2>
                        </div>

                        <div className="space-y-4">
                        <textarea
                            placeholder="Question..."
                            value={flashcardForm.question}
                            onChange={(e) => setFlashcardForm({...flashcardForm, question: e.target.value})}
                            className="w-full p-3 rounded-xl border-2 border-violet-200 focus:border-violet-400 focus:outline-none resize-none"
                        />
                        
                        <textarea
                            placeholder="Answer..."
                            value={flashcardForm.answer}
                            onChange={(e) => setFlashcardForm({...flashcardForm, answer: e.target.value})}
                            className="w-full p-3 rounded-xl border-2 border-violet-200 focus:border-violet-400 focus:outline-none resize-none"
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <select
                            value={flashcardForm.category}
                            onChange={(e) => setFlashcardForm({...flashcardForm, category: e.target.value})}
                            className="p-3 rounded-xl border-2 border-violet-200 focus:border-violet-400 bg-white focus:outline-none"
                            >
                            <option value="DSA">DSA</option>
                            <option value="System Design">System Design</option>
                            <option value="Behavioral">Behavioral</option>
                            <option value="Technical">Technical</option>
                            <option value="General">General</option>
                            </select>

                            <select
                            value={flashcardForm.difficulty}
                            onChange={(e) => setFlashcardForm({...flashcardForm, difficulty: e.target.value})}
                            className="p-3 rounded-xl border-2 border-violet-200 focus:border-violet-400 bg-white focus:outline-none"
                            >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                            </select>
                        </div>
                        
                        <button
                            onClick={addFlashcard}
                            className="w-full p-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-bold shadow-lg border-0 flex items-center justify-center gap-2 transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            Add Flashcard
                        </button>
                        </div>
                    </div>
                    </div>

                    {/* Flashcards List */}
                    <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-2xl opacity-20 blur-lg"></div>
                    <div className="relative bg-gradient-to-br from-white via-indigo-50/30 to-blue-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm p-6">
                        
                        <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                        <Folder className="w-5 h-5 text-indigo-500" />
                        All Flashcards ({flashcards.length})
                        </h3>

                        <div className="space-y-2 max-h-64 overflow-y-auto">
                        {flashcards.map((card, index) => (
                            <div 
                            key={card.id} 
                            className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                                index === currentFlashcard 
                                ? 'bg-gradient-to-r from-indigo-100 to-blue-100 border-indigo-300' 
                                : 'bg-white border-gray-200 hover:border-indigo-200'
                            }`}
                            onClick={() => {
                                setCurrentFlashcard(index);
                                setShowAnswer(false);
                            }}
                            >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                <p className="font-medium text-gray-900 text-sm truncate">
                                    {card.question}
                                </p>
                                <div className="flex gap-2 mt-1">
                                    <span className="text-xs px-2 py-1 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-full">
                                    {card.category}
                                    </span>
                                    <span className={`text-xs px-2 py-1 font-bold rounded-full text-white ${
                                    card.difficulty === 'Easy' ? 'bg-green-500' :
                                    card.difficulty === 'Medium' ? 'bg-yellow-500' :
                                    'bg-red-500'
                                    }`}>
                                    {card.difficulty}
                                    </span>
                                </div>
                                </div>
                                <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteFlashcard(card.id);
                                }}
                                className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-all"
                                >
                                <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            )}

            {/* Calendar Tab */}
            {activeTab === "calendar" && (
                <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Add Interview */}
                <div className="lg:col-span-1">
                    <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-blue-400 rounded-2xl opacity-20 blur-lg"></div>
                    <div className="relative bg-gradient-to-br from-white via-sky-50/30 to-blue-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm p-6">
                        
                        <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl shadow-lg">
                            <Plus className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-black bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                            Schedule Interview 📅
                        </h2>
                        </div>

                        <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Company name..."
                            value={interviewForm.company}
                            onChange={(e) => setInterviewForm({...interviewForm, company: e.target.value})}
                            className="w-full p-3 rounded-xl border-2 border-sky-200 focus:border-sky-400 focus:outline-none"
                        />
                        
                        <input
                            type="text"
                            placeholder="Position..."
                            value={interviewForm.position}
                            onChange={(e) => setInterviewForm({...interviewForm, position: e.target.value})}
                            className="w-full p-3 rounded-xl border-2 border-sky-200 focus:border-sky-400 focus:outline-none"
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <input
                            type="date"
                            value={interviewForm.date}
                            onChange={(e) => setInterviewForm({...interviewForm, date: e.target.value})}
                            className="p-3 rounded-xl border-2 border-sky-200 focus:border-sky-400 focus:outline-none"
                            />

                            <input
                            type="time"
                            value={interviewForm.time}
                            onChange={(e) => setInterviewForm({...interviewForm, time: e.target.value})}
                            className="p-3 rounded-xl border-2 border-sky-200 focus:border-sky-400 focus:outline-none"
                            />
                        </div>

                        <select
                            value={interviewForm.type}
                            onChange={(e) => setInterviewForm({...interviewForm, type: e.target.value})}
                            className="w-full p-3 rounded-xl border-2 border-sky-200 focus:border-sky-400 bg-white focus:outline-none"
                        >
                            <option value="Technical Interview">Technical Interview</option>
                            <option value="Behavioral Interview">Behavioral Interview</option>
                            <option value="System Design">System Design</option>
                            <option value="Phone Screen">Phone Screen</option>
                            <option value="Final Round">Final Round</option>
                        </select>
                        
                        <textarea
                            placeholder="Notes and preparation reminders..."
                            value={interviewForm.notes}
                            onChange={(e) => setInterviewForm({...interviewForm, notes: e.target.value})}
                            className="w-full p-3 rounded-xl border-2 border-sky-200 focus:border-sky-400 focus:outline-none resize-none"
                        />
                        
                        <button
                            onClick={addInterview}
                            className="w-full p-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-bold shadow-lg border-0 flex items-center justify-center gap-2 transition-all"
                        >
                            <Calendar className="w-4 h-4" />
                            Schedule Interview
                        </button>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Interviews List */}
                <div className="lg:col-span-2">
                    <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded-2xl opacity-20 blur-lg"></div>
                    <div className="relative bg-gradient-to-br from-white via-emerald-50/30 to-green-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm p-6">
                        
                        <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl shadow-lg">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            Upcoming Interviews 🎯
                        </h2>
                        </div>

                        <div className="space-y-4 max-h-96 overflow-y-auto">
                        {interviews.length === 0 ? (
                            <div className="text-center py-8">
                            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 font-medium">No interviews scheduled yet. Add your first interview!</p>
                            </div>
                        ) : (
                            interviews.map((interview) => (
                            <div key={interview.id} className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border-2 border-emerald-200 shadow-lg">
                                <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-black text-gray-900">{interview.company}</h3>
                                    <span className="px-2 py-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold rounded-full">
                                        {interview.type}
                                    </span>
                                    <span className={`px-2 py-1 text-xs font-bold rounded-full text-white ${
                                        interview.status === 'Scheduled' ? 'bg-blue-500' :
                                        interview.status === 'Completed' ? 'bg-green-500' :
                                        'bg-red-500'
                                    }`}>
                                        {interview.status}
                                    </span>
                                    </div>
                                    <p className="font-bold text-gray-800 mb-2">{interview.position}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {interview.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {interview.time}
                                    </span>
                                    </div>
                                    {interview.notes && (
                                    <p className="text-gray-700 font-medium text-sm bg-white/50 p-3 rounded-lg">
                                        {interview.notes}
                                    </p>
                                    )}
                                </div>
                                <button
                                    onClick={() => deleteInterview(interview.id)}
                                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                </div>
                            </div>
                            ))
                        )}
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            )}
            </div>
        </div>
        </div>
    );
    };

    export default ExtraFeatures;