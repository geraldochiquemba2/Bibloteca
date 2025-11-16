import { 
  type User, 
  type InsertUser,
  type Book,
  type InsertBook,
  type Loan,
  type InsertLoan,
  type Reservation,
  type InsertReservation,
  type Fine,
  type InsertFine,
  type Category,
  type InsertCategory
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  
  // Book methods
  getBook(id: string): Promise<Book | undefined>;
  getAllBooks(): Promise<Book[]>;
  searchBooks(query: string): Promise<Book[]>;
  createBook(book: InsertBook): Promise<Book>;
  updateBook(id: string, book: Partial<InsertBook>): Promise<Book | undefined>;
  deleteBook(id: string): Promise<boolean>;
  
  // Category methods
  getCategory(id: string): Promise<Category | undefined>;
  getAllCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Loan methods
  getLoan(id: string): Promise<Loan | undefined>;
  getAllLoans(): Promise<Loan[]>;
  getLoansByUser(userId: string): Promise<Loan[]>;
  getLoansByBook(bookId: string): Promise<Loan[]>;
  getActiveLoans(): Promise<Loan[]>;
  getOverdueLoans(): Promise<Loan[]>;
  createLoan(loan: InsertLoan): Promise<Loan>;
  updateLoan(id: string, loan: Partial<InsertLoan>): Promise<Loan | undefined>;
  
  // Reservation methods
  getReservation(id: string): Promise<Reservation | undefined>;
  getAllReservations(): Promise<Reservation[]>;
  getReservationsByUser(userId: string): Promise<Reservation[]>;
  getReservationsByBook(bookId: string): Promise<Reservation[]>;
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  updateReservation(id: string, reservation: Partial<InsertReservation>): Promise<Reservation | undefined>;
  
  // Fine methods
  getFine(id: string): Promise<Fine | undefined>;
  getAllFines(): Promise<Fine[]>;
  getFinesByUser(userId: string): Promise<Fine[]>;
  createFine(fine: InsertFine): Promise<Fine>;
  updateFine(id: string, fine: Partial<InsertFine>): Promise<Fine | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private books: Map<string, Book>;
  private categories: Map<string, Category>;
  private loans: Map<string, Loan>;
  private reservations: Map<string, Reservation>;
  private fines: Map<string, Fine>;

  constructor() {
    this.users = new Map();
    this.books = new Map();
    this.categories = new Map();
    this.loans = new Map();
    this.reservations = new Map();
    this.fines = new Map();
    
    // Initialize with default admin user
    const adminId = randomUUID();
    this.users.set(adminId, {
      id: adminId,
      username: "admin",
      password: "admin123",
      name: "Administrador",
      email: "admin@isptec.ao",
      userType: "admin" as const,
      isActive: true,
      createdAt: new Date(),
    });
    
    // Initialize with sample categories
    const categories = [
      { name: "Informática", description: "Livros de Ciência da Computação e TI" },
      { name: "Engenharia", description: "Livros de Engenharia" },
      { name: "Matemática", description: "Livros de Matemática" },
      { name: "Física", description: "Livros de Física" },
      { name: "Literatura", description: "Literatura geral" },
    ];
    
    categories.forEach(cat => {
      const id = randomUUID();
      this.categories.set(id, { id, ...cat });
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      id,
      username: insertUser.username,
      password: insertUser.password,
      name: insertUser.name,
      email: insertUser.email,
      userType: insertUser.userType ?? "student",
      isActive: insertUser.isActive ?? true,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, userData: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Book methods
  async getBook(id: string): Promise<Book | undefined> {
    return this.books.get(id);
  }

  async getAllBooks(): Promise<Book[]> {
    return Array.from(this.books.values());
  }

  async searchBooks(query: string): Promise<Book[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.books.values()).filter(
      (book) =>
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery) ||
        book.isbn?.toLowerCase().includes(lowerQuery),
    );
  }

  async createBook(insertBook: InsertBook): Promise<Book> {
    const id = randomUUID();
    const book: Book = { 
      id,
      title: insertBook.title,
      author: insertBook.author,
      isbn: insertBook.isbn ?? null,
      publisher: insertBook.publisher ?? null,
      yearPublished: insertBook.yearPublished ?? null,
      categoryId: insertBook.categoryId ?? null,
      tag: insertBook.tag ?? "white",
      totalCopies: insertBook.totalCopies ?? 1,
      availableCopies: insertBook.availableCopies ?? 1,
      description: insertBook.description ?? null,
      coverImage: insertBook.coverImage ?? null,
      createdAt: new Date(),
    };
    this.books.set(id, book);
    return book;
  }

  async updateBook(id: string, bookData: Partial<InsertBook>): Promise<Book | undefined> {
    const book = this.books.get(id);
    if (!book) return undefined;
    
    const updatedBook = { ...book, ...bookData };
    this.books.set(id, updatedBook);
    return updatedBook;
  }

  async deleteBook(id: string): Promise<boolean> {
    return this.books.delete(id);
  }

  // Category methods
  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { 
      id, 
      name: insertCategory.name,
      description: insertCategory.description ?? null,
    };
    this.categories.set(id, category);
    return category;
  }

  // Loan methods
  async getLoan(id: string): Promise<Loan | undefined> {
    return this.loans.get(id);
  }

  async getAllLoans(): Promise<Loan[]> {
    return Array.from(this.loans.values());
  }

  async getLoansByUser(userId: string): Promise<Loan[]> {
    return Array.from(this.loans.values()).filter(
      (loan) => loan.userId === userId,
    );
  }

  async getLoansByBook(bookId: string): Promise<Loan[]> {
    return Array.from(this.loans.values()).filter(
      (loan) => loan.bookId === bookId,
    );
  }

  async getActiveLoans(): Promise<Loan[]> {
    return Array.from(this.loans.values()).filter(
      (loan) => loan.status === "active",
    );
  }

  async getOverdueLoans(): Promise<Loan[]> {
    const now = new Date();
    return Array.from(this.loans.values()).filter(
      (loan) => loan.status === "active" && new Date(loan.dueDate) < now,
    );
  }

  async createLoan(insertLoan: InsertLoan): Promise<Loan> {
    const id = randomUUID();
    const loan: Loan = { 
      id,
      userId: insertLoan.userId,
      bookId: insertLoan.bookId,
      dueDate: insertLoan.dueDate,
      status: insertLoan.status ?? "active",
      returnDate: insertLoan.returnDate ?? null,
      renewalCount: insertLoan.renewalCount ?? 0,
      loanDate: new Date(),
      createdAt: new Date(),
    };
    this.loans.set(id, loan);
    return loan;
  }

  async updateLoan(id: string, loanData: Partial<InsertLoan>): Promise<Loan | undefined> {
    const loan = this.loans.get(id);
    if (!loan) return undefined;
    
    const updatedLoan = { ...loan, ...loanData };
    this.loans.set(id, updatedLoan);
    return updatedLoan;
  }

  // Reservation methods
  async getReservation(id: string): Promise<Reservation | undefined> {
    return this.reservations.get(id);
  }

  async getAllReservations(): Promise<Reservation[]> {
    return Array.from(this.reservations.values());
  }

  async getReservationsByUser(userId: string): Promise<Reservation[]> {
    return Array.from(this.reservations.values()).filter(
      (reservation) => reservation.userId === userId,
    );
  }

  async getReservationsByBook(bookId: string): Promise<Reservation[]> {
    return Array.from(this.reservations.values()).filter(
      (reservation) => reservation.bookId === bookId,
    );
  }

  async createReservation(insertReservation: InsertReservation): Promise<Reservation> {
    const id = randomUUID();
    const reservation: Reservation = { 
      id,
      userId: insertReservation.userId,
      bookId: insertReservation.bookId,
      status: insertReservation.status ?? "pending",
      notificationDate: insertReservation.notificationDate ?? null,
      expirationDate: insertReservation.expirationDate ?? null,
      reservationDate: new Date(),
      createdAt: new Date(),
    };
    this.reservations.set(id, reservation);
    return reservation;
  }

  async updateReservation(id: string, reservationData: Partial<InsertReservation>): Promise<Reservation | undefined> {
    const reservation = this.reservations.get(id);
    if (!reservation) return undefined;
    
    const updatedReservation = { ...reservation, ...reservationData };
    this.reservations.set(id, updatedReservation);
    return updatedReservation;
  }

  // Fine methods
  async getFine(id: string): Promise<Fine | undefined> {
    return this.fines.get(id);
  }

  async getAllFines(): Promise<Fine[]> {
    return Array.from(this.fines.values());
  }

  async getFinesByUser(userId: string): Promise<Fine[]> {
    return Array.from(this.fines.values()).filter(
      (fine) => fine.userId === userId,
    );
  }

  async createFine(insertFine: InsertFine): Promise<Fine> {
    const id = randomUUID();
    const fine: Fine = { 
      id,
      loanId: insertFine.loanId,
      userId: insertFine.userId,
      amount: insertFine.amount,
      status: insertFine.status ?? "pending",
      daysOverdue: insertFine.daysOverdue,
      paymentDate: insertFine.paymentDate ?? null,
      createdAt: new Date(),
    };
    this.fines.set(id, fine);
    return fine;
  }

  async updateFine(id: string, fineData: Partial<InsertFine>): Promise<Fine | undefined> {
    const fine = this.fines.get(id);
    if (!fine) return undefined;
    
    const updatedFine = { ...fine, ...fineData };
    this.fines.set(id, updatedFine);
    return updatedFine;
  }
}

export const storage = new MemStorage();
