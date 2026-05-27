import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash, Mail, MailOpen, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useMessages, useDeleteMessage, useMarkMessageRead } from "@/hooks/useData";

export default function MessagesAdmin() {
  const { data: messages, isLoading } = useMessages();
  const deleteMessage = useDeleteMessage();
  const markRead = useMarkMessageRead();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteMessage.mutateAsync(id);
      toast.success("Message deleted");
    } catch (err: any) {
      toast.error(err.message || "Delete failed");
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await markRead.mutateAsync(id);
      toast.success("Marked as read");
    } catch (err: any) {
      toast.error(err.message || "Failed");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Contact Messages</h2>
          <p className="text-muted-foreground">
            Messages submitted through the contact form
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No messages yet.
                    </TableCell>
                  </TableRow>
                )}
                {messages?.map((msg: any) => (
                  <TableRow key={msg.id} className={msg.is_read ? "" : "bg-primary/5"}>
                    <TableCell>
                      {msg.is_read ? (
                        <MailOpen className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Mail className="h-4 w-4 text-primary" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{msg.name}</TableCell>
                    <TableCell>
                      <a href={`mailto:${msg.email}`} className="text-primary hover:underline">
                        {msg.email}
                      </a>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{msg.message}</TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {!msg.is_read && (
                          <Button variant="ghost" size="sm" onClick={() => handleMarkRead(msg.id)}>
                            Mark read
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(msg.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

